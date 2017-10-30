import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules/index.js';

//ATTIVAZIONE HOT MODULE RELOADER
if (module.hot) {
    module.hot.accept();
}
//CREAZIONE DELLO STORE
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunk
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;