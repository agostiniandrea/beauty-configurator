import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import modules from 'Modules/index.js';
import { routerMiddleware } from 'react-router-redux';
import history from 'Routes/history';

//ATTIVAZIONE HOT MODULE RELOADER
if (module.hot) {
    module.hot.accept();
}
//CREAZIONE DELLO STORE
const store = createStore(
    modules, compose(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;