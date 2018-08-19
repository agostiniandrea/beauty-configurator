export default (state = -1, action) => {
    switch (action.type) {
        case 'USER/INIT_DATA': {
            return initData(action.payload);
        }
        /* case 'USER/SET_DATA': {
            return setData(state, action.payload);
        } */
        default:
            return state;
    }
};

function initData(payload) {
    return {
        description: payload.description,
        divisionCode: payload.divisionCode,
        userCode: payload.userCode
    };
}

/* function setData(state, payload) {
    return {
        ...state,
        ...payload
    };
} */