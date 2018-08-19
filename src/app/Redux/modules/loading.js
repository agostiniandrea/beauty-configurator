
// ------------------------------------
// CONSTANTS
// ------------------------------------
export const START_LOADING = 'LOADING/START_LOADING';
export const END_LOADING = 'LOADING/END_LOADING';

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = false, action) {
    switch (action.type) {
        case START_LOADING: {
            return action.payload;
        }
        case END_LOADING: {
            return action.payload;
        }
        default:
            return state;
    }
}

// ------------------------------------
// ACTIONS
// ------------------------------------
export const startLoading = () => {
    return { type: START_LOADING, payload: true };
};

export const endLoading = () => {
    return { type: END_LOADING, payload: false };
};