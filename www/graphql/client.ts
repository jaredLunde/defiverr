import {createClient, dedupExchange, fetchExchange, cacheExchange} from 'urql';
import {devtoolsExchange} from '@urql/devtools';
import {refocusExchange} from '@urql/exchange-refocus';
import {persistedFetchExchange} from '@urql/exchange-persisted-fetch';
import {requestPolicyExchange} from '@urql/exchange-request-policy';
import {retryExchange} from '@urql/exchange-retry';

export const client = createClient({
  url: 'http://localhost:3000/api/graphql',
  fetchOptions: () => {
    const token = localStorage.getItem('jwt');
    return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
  },
  exchanges: [
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
  ],
});
