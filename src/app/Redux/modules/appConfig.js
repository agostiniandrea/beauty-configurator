import config from 'AppConfig';

const initState = config;

// ------------------------------------
// CONSTANTS
// ------------------------------------

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = initState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

// ------------------------------------
// ACTIONS
// ------------------------------------