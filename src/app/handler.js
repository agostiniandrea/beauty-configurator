import store from './Redux/store';
import axios from 'axios';
import { objValidator } from 'Utility';

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
        getData()
            .then((resp) => {
                initInfo(resp[location.params.id])
                    .then(() => {
                        setInfo({ image: 'logos/' + location.params.id + '.png' });
                        resolve();
                    })
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });
}

function getData() {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:3000/server/data/users.json',
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

function initInfo(payload) {
    return new Promise((resolve) => {
        store.dispatch({
            type: 'USER/INIT_DATA',
            payload: payload
        });

        resolve();
    });
}

function setInfo(payload) {
    return new Promise((resolve) => {
        store.dispatch({
            type: 'USER/SET_DATA',
            payload: payload
        });

        resolve();
    });
}

function getImage(id) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:3000/server/logos/' + id + '.png',
            method: 'get',
            headers: { 'Content-type': 'image/png' }
        }).then((response) => {
            if (response && response.status == 200) {
                resolve(response.data);
            } else {
                resolve(null);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}