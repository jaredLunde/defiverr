import {produce} from 'immer';
import type {Draft} from 'immer';
import create from 'zustand';
import type {GetState, State, StateCreator, StoreApi, UseStore} from 'zustand';

export function createImmerStore<S extends State, M extends MutationTypes>({
  state,
  mutations,
}: {
  state: StateCreator<S, (fn: (draft: Draft<S>) => void) => void>;
  mutations: MutationsMap<S, M>;
}) {
  return create<S>(immer<S, M>(state, mutations) as any) as UseImmerStore<S, M>;
}

export function createPersistentImmerStore<
  S extends State,
  M extends MutationTypes
>({
  state,
  mutations,
  options,
}: {
  state: StateCreator<S, (fn: (draft: Draft<S>) => void) => void>;
  mutations: MutationsMap<S, M>;
  options: PersistOptions<S>;
}) {
  return create<S>(
    persistImmer<S, M>(state, mutations, options) as any
  ) as UseImmerStore<S, M>;
}

function immer<S extends State, M extends MutationTypes>(
  config: StateCreator<S, (fn: (draft: Draft<S>) => void) => void>,
  mutations: MutationsMap<S, M>
): StateCreatorWithDispatch<S, M> {
  return (set, get, api) => {
    const savedSetState = api.setState;
    // @ts-expect-error
    api.setState = (fn) => savedSetState(produce(get(), fn));
    api.dispatch = <
      MutationType extends keyof typeof mutations,
      MutationPayload extends M[MutationType]
    >(
      type: MutationType,
      payload: MutationPayload
    ) => {
      api.setState((state) => {
        mutations[type](state, payload);
      });
    };
    // @ts-expect-error
    return config((fn) => set(produce(get(), fn)), get, api);
  };
}

export function persistImmer<S extends State, M extends MutationTypes>(
  config: StateCreator<S, (fn: (draft: Draft<S>) => void) => void>,
  mutations: MutationsMap<S, M>,
  {
    name,
    storage = localStorage,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    exclude,
    include,
    version = 1,
  }: PersistOptions<S>
): StateCreatorWithDispatch<S, M> {
  return (set, get, api) => {
    function setItem() {
      let state = {} as S;

      if (include) {
        (Object.keys(state).filter((key) => include.includes(key)) as Extract<
          keyof S,
          string
        >[]).forEach((key) => {
          state[key] = get()[key];
        });
      } else if (exclude) {
        (Object.keys(state).filter((key) => !exclude.includes(key)) as Extract<
          keyof S,
          string
        >[]).forEach((key) => {
          state[key] = get()[key];
        });
      } else {
        state = get();
      }

      storage?.setItem(name, serialize({state, version}));
    }

    const savedSetState = api.setState;

    api.setState = (fn) => {
      // @ts-expect-error
      savedSetState(produce(get(), fn));
      setItem();
    };

    const storageValue = storage.getItem(name);
    let deserializedStorageValue: StorageValue<S> | Record<string, never> = {};

    if (storageValue) {
      deserializedStorageValue = deserialize(storageValue);

      // if versions mismatch, clear storage by storing the new initial state
      if (deserializedStorageValue.version !== version) {
        setItem();
      }
    }

    function persistSet(fn: (draft: Draft<S>) => void | S) {
      // @ts-expect-error
      set(produce(get(), fn));
      setItem();
    }

    api.dispatch = <
      MutationType extends keyof typeof mutations,
      MutationPayload extends M[MutationType]
    >(
      type: MutationType,
      payload: MutationPayload
    ) => {
      persistSet((state) => {
        mutations[type](state, payload);
      });
    };

    return {
      // @ts-expect-error
      ...config(persistSet, get, api),
      ...deserializedStorageValue.state,
    };
  };
}

interface UseImmerStore<S extends State, M extends MutationTypes>
  extends UseStore<S> {
  dispatch<
    MutationType extends keyof M,
    MutationPayload extends M[MutationType]
  >(
    type: MutationType,
    payload: MutationPayload
  ): void;
}

type StoreApiWithDispatch<S extends State, M extends MutationTypes> = Omit<
  StoreApi<S>,
  'setState'
> & {
  setState(fn: (draft: Draft<S>) => void): void;
  dispatch<MutationType extends keyof M = keyof M>(
    type: MutationType,
    payload: M[MutationType]
  ): void;
};

type StateCreatorWithDispatch<S extends State, M extends MutationTypes> = (
  set: (fn: (draft: Draft<S>) => void | S) => void,
  get: GetState<S>,
  api: StoreApiWithDispatch<S, M>
) => S;

type PersistOptions<S extends State> = {
  /** Name of the storage (must be unique) */
  name: string;
  /**
   * A function returning a storage.
   * The storage must fit `window.localStorage`'s api (or an async version of it).
   * For example the storage could be `AsyncStorage` from React Native.
   *
   * @default  localStorage
   */
  storage?: StateStorage;
  /**
   * Use a custom serializer.
   * The returned string will be stored in the storage.
   *
   * @default JSON.stringify
   */
  serialize?: (state: StorageValue<S>) => string;
  /**
   * Use a custom deserializer.
   *
   * @param str The storage's current value.
   * @default JSON.parse
   */
  deserialize?: (str: string) => StorageValue<S>;
  /**
   * Only store the listed properties. This takes precedence over `exclude` when
   * both are included.
   */
  include?: (keyof S)[];
  /**
   * Prevent some items from being stored.
   */
  exclude?: (keyof S)[];
  /**
   * If the stored state's version mismatch the one specified here, the storage will not be used.
   * This is useful when adding a breaking change to your store.
   */
  version?: number;
};

type StateStorage = {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
};
type StorageValue<S> = {state: S; version: number};
type PersistAtomStorageValue<Value> = {version: number; value: Value};

type MutationTypes = Record<string, unknown>;
type MutationsMap<S extends State, M extends MutationTypes> =
  | {
      [Type in keyof M]: (state: Draft<S>, payload: M[Type]) => S | void;
    }
  | ((
      set: (draft: Draft<S>) => void,
      get: GetState<S>
    ) => {
      [Type in keyof M]: (state: Draft<S>, payload: M[Type]) => S | void;
    });
