// ------------------------------------
// CONSTANTS
// ------------------------------------
export const INIT_DATA = 'USER/INIT_DATA';

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = -1, action) {
    switch (action.type) {
        case INIT_DATA: {
            return initDataFunc(action.payload);
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

function initDataFunc(payload) {
    return {
        description: payload.description,
        divisionCode: payload.divisionCode,
        userCode: payload.userCode
    };
}