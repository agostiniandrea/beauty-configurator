export default (state = -1, action) => {
    switch (action.type) {
        case 'USER/INIT_DATA': {
            return action.payload;
        }
        case 'USER/SET_DATA': {
            return setData(state, action.payload);
        }
        default:
            return state;
    }
};

function setData(state, payload) {
    return {
        ...state,
        ...payload
    };
}