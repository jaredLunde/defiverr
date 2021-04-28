import {devtoolsExchange} from '@urql/devtools';
import {persistedFetchExchange} from '@urql/exchange-persisted-fetch';
import {refocusExchange} from '@urql/exchange-refocus';
import {requestPolicyExchange} from '@urql/exchange-request-policy';
import {retryExchange} from '@urql/exchange-retry';
import {withUrqlClient as urqlWithUrqlClient} from 'next-urql';
import type {NextComponentType} from 'next-urql';
import {cacheExchange, createClient, dedupExchange, fetchExchange} from 'urql';

const exchanges = [
  devtoolsExchange,
  dedupExchange,
  requestPolicyExchange({
    ttl: 60 * 1000,
  }),
  persistedFetchExchange({
    preferGetForPersistedQueries: true,
  }),
  refocusExchange(),
  retryExchange({}),
  cacheExchange,
  fetchExchange,
];

export const client = createClient({
  url: '/api/graphql',
  // fetchOptions: () => {
  //   const token = localStorage.getItem('jwt');
  //   return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
  // },
  exchanges,
});

export function withUrqlClient(Component: NextComponentType) {
  return urqlWithUrqlClient(
    () => ({
      url: '/api/graphql',
      exchanges,
    }),
    {ssr: false}
  )(Component);
}
