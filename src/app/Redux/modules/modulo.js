import _ from 'lodash';

const initState = {
    nome: 'pippo',
    cognome: 'franco'
};

const reducers = {
    setName: (state, nome) => {
        return {
            ...state,
            nome
        };
    }
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case SET_NAME: {
            return reducers.setName(state, action.payload);
        }
        default:
            return state;
    }
};

//Events
export const SET_NAME = 'SET_NAME';

//Action Creators
export const setActiveMenu = (nome) => {
    return {
        type: SET_NAME,
        payload: nome
    };
};