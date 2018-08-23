import store from './Redux/store';
import Api from 'Api';
import TranslateConfig from '../locales/index';
import { endLoading, startLoading } from 'Modules/loading';
import { initData as modelsInitData } from 'Modules/models';
/* import { initData as routingInitData } from 'Modules/routing'; */
import { initData as sectionsInitData } from 'Modules/sections';
import { initData as userInitData } from 'Modules/user';

let LANG = null;
let USER_ID = null;
let firstLanding = true;

export default (location) => new Promise((resolve, reject) => {
    LANG = location.params.lang;
    USER_ID = location.params.id;
    TranslateConfig(LANG);
    if (store.getState().user === -1 && firstLanding) {
        firstLanding = false;
        /* store.dispatch(routingInitData(initRouting(location))); */
        initApp()
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    }
});

/* function initRouting(location) {
    return {
        locationBeforeTransitions: {
            action: 'POP',
            hash: '',
            key: null,
            pathname: location.location.pathname,
            search: location.location.search,
            query: {},
            state: null
        }
    };
} */

function initApp() {
    return new Promise((resolve, reject) => {
        document.title = 'Loading...';
        store.dispatch(startLoading());
        store.dispatch(sectionsInitData(store.getState().appConfig.defaultPages));
        Api.getRegistry(USER_ID)
            .then((resp) => {
                document.title = resp.user.description;
                /* store.dispatch(sectionsSetData(resp.user)); */
                store.dispatch(userInitData(resp.user));
                store.dispatch(modelsInitData(resp));
                store.dispatch(endLoading());
                resolve();
            })
            .catch((error) => reject(error));
        /* getConfiguration(USER_ID)
            .then((resp) => {
                setConfiguration(resp)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error)); */
    });
}