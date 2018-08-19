import store from './Redux/store';
import axios from 'axios';
import { objValidator } from 'Utility';
import TranslateConfig from '../locales/index';
import { endLoading, startLoading } from 'Modules/loading';
import { initData as modelsInitData } from 'Modules/models';
/* import { initData as sectionsInitData, setData as sectionsSetData } from 'Modules/sections'; */
import { initData as userInitData } from 'Modules/user';

let LANG = null;
let USER_ID = null;

export default (location) => new Promise((resolve, reject) => {
    LANG = location.params.lang;
    USER_ID = location.params.id;
    TranslateConfig(LANG);
    initApp()
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
});

function initApp() {
    return new Promise((resolve, reject) => {
        document.title = 'Loading...';
        /* sectionsInitData(store.getState().appConfig.firstStep); */
        getRegistry(USER_ID)
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

function getRegistry(id) {
    store.dispatch(startLoading());
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:3000/server/registry/' + id + '.json',
            method: 'get',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then((response) => {
            if (response && response.status == 200) {
                const result = objValidator(response, 'data');
                resolve(result);
            } else {
                resolve([]);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

function getConfiguration(id) {
    store.dispatch(startLoading());
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:3000/server/configurations/' + id + '.json',
            method: 'get',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then((response) => {
            store.dispatch(endLoading());
            if (response && response.status == 200) {
                const result = objValidator(response, 'data');
                resolve(result);
            } else {
                resolve([]);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}