import { paramNames } from './../../routes';

// ------------------------------------
// CONSTANTS
// ------------------------------------
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = -1, action) {
    switch (action.type) {
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

// ------------------------------------
// FUNCTIONS
// ------------------------------------

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