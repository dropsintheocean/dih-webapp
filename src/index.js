import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import router from './router.jsx';
import store from './store';

if (!__DEV__) {
    require('raven-js')
        .config(process.env.RAVEN_DSN, {
            release: require('../package.json').version,
            tags: {
                environment: process.env.NODE_ENV
            }
        })
        .install();
}

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        {router}
    </Provider>,
    rootElement
);
