import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHashHistory } from 'history';
import routes from './routes';
import store from './Redux/store';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const history = syncHistoryWithStore(appHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes}>
        </Router>
    </Provider>,
    document.getElementById('app')
);
