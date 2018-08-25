import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
/* import { AppContainer } from 'react-hot-loader'; */
import { createHashHistory } from 'history';

import routes from 'Routes';

import '../scss/Variables.scss';

import Store from 'Store';

const appHistory = useRouterHistory(createHashHistory)(/* { queryKey: false } */);
const history = syncHistoryWithStore(appHistory, Store);

render(
    <Provider store={Store}>
        <Router history={history} routes={routes}>
        </Router>
    </Provider>,
    document.getElementById('app')
);