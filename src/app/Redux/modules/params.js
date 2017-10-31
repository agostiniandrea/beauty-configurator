import { paramNames } from './../../routes';
import { data } from './../../../users/users.json';

export default (state = {}, action) => {
    switch(action.type){
        case '@@router/LOCATION_CHANGE': {
            return getParams(action.payload);
        }
        default:
            return state;
    }
};

function getParams({pathname}){
    let params = {};
    let pathElements = pathname.split('/');
    for(let key of paramNames){
        if(pathElements.indexOf(key)>-1){
            for (let user of data) {
                if (user.id == pathElements[pathElements.indexOf(key)+1]) params = user;
            }
        }
    }
    return params;
}