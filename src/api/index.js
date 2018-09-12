import axios from 'axios';
import { objValidator } from 'Utilities';

export default {
    getModel,
    getRegistry
};

function getRegistry(id) {
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

function getModel(id) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:3000/server/models/' + id + '.json',
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