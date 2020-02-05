import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { RetryLink } from 'apollo-link-retry';
import { SyncHook } from 'tapable';

import { Util } from '@magento/peregrine';
import { Adapter } from '@magento/venia-drivers';
import store from './store';
import app from '@magento/peregrine/lib/store/actions/app';
import App, { AppContextProvider } from '@magento/venia-ui/lib/components/App';

import { registerTapableHooks } from './extensions';
import { registerSW } from './registerSW';
import './index.css';

const { BrowserPersistence } = Util;
const apiBase = new URL('/graphql', location.origin).toString();

/**
 * The Venia adapter provides basic context objects: a router, a store, a
 * GraphQL client, and some common functions.
 */

// The Venia adapter is not opinionated about auth.
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists.
    const storage = new BrowserPersistence();
    const token = storage.getItem('signin_token');

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// @see https://www.apollographql.com/docs/link/composition/.
const apolloLink = ApolloLink.from([
    // by default, RetryLink will retry an operation five (5) times.
    new RetryLink(),
    authLink,
    // An apollo-link-http Link
    Adapter.apolloLink(apiBase)
]);

ReactDOM.render(
    <Adapter apiBase={apiBase} apollo={{ link: apolloLink }} store={store}>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </Adapter>,
    document.getElementById('root')
);

registerSW();

const onlineSyncHook = new SyncHook(['isOnline']);

onlineSyncHook.tap('venia-concept', isOnline => {
    const dispatcher = isOnline ? app.setOnline : app.setOffline;
    store.dispatch(dispatcher());
});

window.addEventListener('online', () => {
    onlineSyncHook.call(true);
});

window.addEventListener('offline', () => {
    onlineSyncHook.call(false);
});

registerTapableHooks({
    onlineSyncHook
})
    .then(() => {
        console.log('All extensions have been registered');
    })
    .catch(() => {
        console.warn('Unable to register 1 or more extensions');
    });

if (module.hot) {
    // When any of the dependencies to this entry file change we should hot reload.
    module.hot.accept();
}
