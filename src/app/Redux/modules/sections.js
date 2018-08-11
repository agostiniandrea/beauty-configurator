import _ from 'lodash';

export default (state = -1, action) => {
    switch (action.type) {
        case 'SECTIONS/INIT_DATA': {
            return [action.payload];
        }
        case 'SECTIONS/SET_DATA': {
            return setData(state, action.payload);
        }
        default:
            return state;
    }
};

function setData(state, payload) {
    return [
        ...state,
        ...payload
    ];
}