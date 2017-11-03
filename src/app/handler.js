import store from './Redux/store';

export default (location) => new Promise((resolve, reject) => {
    initApp(location)
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
});

function initApp(location) {
    return new Promise((resolve, reject) => {
        getInfo(location.params)
            .then(() => {
                resolve();
            })
            .catch((error) => reject(error));
    });
}

function getInfo(params) {
    return new Promise((resolve) => {
        store.dispatch({
            type: 'USER/GET_INFO',
            payload: params
        });

        resolve();
    });
}