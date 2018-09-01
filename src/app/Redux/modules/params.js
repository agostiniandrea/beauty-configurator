import { paramNames } from 'Routes';

// ------------------------------------
// CONSTANTS
// ------------------------------------
export const INIT_DATA = '@@router/INIT_DATA';
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = -1, action) {
    switch (action.type) {
        case INIT_DATA: {
            return initParams(action.payload);
        }
        case LOCATION_CHANGE: {
            return getParams(action.payload);
        }
        default:
            return state;
    }
}

// ------------------------------------
// ACTIONS
// ------------------------------------
export const initData = (payload) => {
    return { type: INIT_DATA, payload: payload };
};

// ------------------------------------
// FUNCTIONS
// ------------------------------------

function initParams({ hash }) {
    let params = {};
    let pathElements = hash.split('/');
    for (let key of paramNames) {
        if (pathElements.indexOf(key) > -1) {
            params[key] = pathElements[pathElements.indexOf(key) + 1];
        }
    }
    return params;
}

function getParams({ pathname }) {
    let params = {};
    let pathElements = pathname.split('/');
    for (let key of paramNames) {
        if (pathElements.indexOf(key) > -1) {
            params[key] = pathElements[pathElements.indexOf(key) + 1];
        }
    }
    return params;
}