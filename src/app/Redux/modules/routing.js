/* // ------------------------------------
// CONSTANTS
// ------------------------------------
export const INIT_DATA = 'ROUTING/INIT_DATA';

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = routeInitialState, action) {
    switch (action.type) {
        case INIT_DATA: {
            return action.payload;
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
}; */