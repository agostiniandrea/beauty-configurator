export default (state = {}, action) => {
    switch (action.type) {
        case 'USER/INIT_DATA': {
            return action.payload;
        }
        case 'USER/SET_DATA': {
            return setInfo(state, action.payload);
        }
        default:
            return state;
    }
};

function setInfo(state, payload) {
    return {
        ...state,
        ...payload
    };
}