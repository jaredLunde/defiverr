import deepEqual from 'fast-deep-equal';
import {useRouter} from 'next/router';
import * as React from 'react';
import {createRequest} from 'urql';
import type {CombinedError} from 'urql';
import {pipe, toPromise} from 'wonka';
import type {EqualityChecker, StateSelector} from 'zustand';
import {client} from '@/graphql/client';
import {AuthenticateDocument, Viewer} from '@/graphql/hooks';
import type {AuthenticateMutation} from '@/graphql/hooks';
import {createImmerStore} from '@/stores';
import {hasMetaMask} from '@/utils/has-metamask';

const useViewerStore = createImmerStore({
  state: (): ViewerStore => ({
    data: null,
    status: 'idle',
    error: null,
  }),

  mutations: {
    setViewer(draft, payload: (Viewer & {token?: string}) | null = null) {
      if (!payload) {
        if (draft.data) {
          draft.data = payload;
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {__typename, ...viewer} = payload;

        if (
          // Dont' update the store if the viewer didn't change
          !deepEqual(viewer, draft.data)
        ) {
          draft.data = viewer;
          draft.error = null;
        }
      }
    },

    setError(draft, value: CombinedError | null = null) {
      draft.status = 'error';
      // @ts-expect-error
      draft.error = value;
    },

    setStatus(draft, value: Status = 'idle') {
      if (
        draft.status !== 'idle' &&
        draft.status !== 'fetching' &&
        value === 'fetching'
      ) {
        draft.status = 'refetching';
      } else {
        draft.status = value;
      }
    },

    clear(draft) {
      draft.data = null;
      draft.error = null;
    },
  },
});

export const useViewer = Object.assign(
  function useViewer<S extends ViewerQueryState, U = ViewerQueryState>(
    // @ts-expect-error
    selector: StateSelector<S, U> = defaultSelector,
    areEqual: EqualityChecker<U> = Object.is
  ): U {
    const storedSelector = React.useRef(selector);
    const router = useRouter();

    React.useEffect(() => {
      // Reauthenticate when the page changes
      router.events.on('routeChangeStart', authenticate);

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off('routeChangeStart', authenticate);
      };
    }, [router]);

    React.useEffect(() => {
      storedSelector.current = selector;
    });

    React.useEffect(() => {
      window.ethereum?.on('accountsChanged', (accounts: string[]) => {
        // TODO: Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
        const viewer = useViewerStore.getState().data;
        if (!viewer) return;
        if ((!accounts[0] && viewer) || accounts[0] !== viewer?.walletAddress) {
          logout();
        }
      });
    }, []);

    const state = useViewerStore<U>(
      ({data, status, error}) =>
        storedSelector.current({
          data,
          error,
          fetching: status === 'fetching',
          refetch: authenticate,
        } as S),
      areEqual
    );

    const store = useViewerStore.getState();
    // Reauthenticates if the viewer state has likely changed or hasn't
    // been fetched at all
    React.useEffect(() => {
      if (!store.data) {
        authenticate();
      }
    }, []);
    // Logs the user out if they are no longer using their MetaMask wallet
    if (!hasMetaMask() && store.data) {
      logout();
    }

    return state;
  },
  {dispatch: useViewerStore.dispatch} as const
);

// Try to authenticate the user right away
authenticate();

if (typeof window !== 'undefined') {
  // Reauthenticate when user's network comes back online
  window.addEventListener('online', authenticate);
  // Reauthenticate when the tab visibility changes
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      authenticate();
    }
  });
  // Handle the new chain.
  // Correctly handling chain changes can be complicated.
  // We recommend reloading the page unless you have good reason not to.
  window.ethereum?.on('chainChanged', () => {
    window.location.reload();
  });
}

export async function logout() {
  useViewerStore.dispatch('setStatus', 'fetching');
  useViewerStore.dispatch('clear');
  const res = await fetch('/api/logout');
  useViewerStore.dispatch('setStatus', 'success');

  if (res.ok && typeof window !== 'undefined') {
    window.location.reload();
  }
}

async function authenticate() {
  const {status} = useViewerStore.getState();

  if (status !== 'fetching' && status !== 'refetching') {
    useViewerStore.dispatch('setStatus', 'fetching');
    const response = await pipe(
      client.executeMutation<AuthenticateMutation>(
        createRequest(AuthenticateDocument, {})
      ),
      toPromise
    );

    let maybeViewer = response.data?.authenticate;
    if (maybeViewer) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {__typename, ...nextMaybeViewer} = maybeViewer;
      maybeViewer = nextMaybeViewer;
    }

    if (response.error) {
      useViewerStore.dispatch('setError', response.error);
    } else {
      useViewerStore.dispatch('setViewer', maybeViewer as Viewer | null);
      useViewerStore.dispatch('setStatus', 'success');
    }

    return response;
  }

  return;
}

const defaultSelector = createDefaultSelector();

function createDefaultSelector() {
  let prev: ViewerQueryState;

  return function (state: ViewerQueryState) {
    if (
      !prev ||
      prev.data !== state.data ||
      prev.error !== state.error ||
      prev.fetching !== state.fetching
    ) {
      prev = state;
      return state;
    }

    return prev;
  };
}

type ViewerStore = {
  data: Omit<Viewer, '__typename'> | null;
  error: CombinedError | null;
  status: Status;
};

export type ViewerQueryState = {
  data: ViewerStore['data'];
  error: ViewerStore['error'];
  fetching: boolean;
  refetch(): ReturnType<typeof authenticate>;
};

type Status = 'idle' | 'error' | 'fetching' | 'refetching' | 'success';
