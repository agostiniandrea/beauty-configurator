import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import modules from 'Modules/index.js';

//ATTIVAZIONE HOT MODULE RELOADER
if (module.hot) {
    module.hot.accept();
}
//CREAZIONE DELLO STORE
const store = createStore(
    combineReducers(modules),
    compose(
        applyMiddleware(
            thunk
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;