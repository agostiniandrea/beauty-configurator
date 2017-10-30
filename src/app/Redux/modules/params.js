import { paramNames } from './../../routes';

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
            params[key] = pathElements[pathElements.indexOf(key)+1];
        }
    }
    return params;
}