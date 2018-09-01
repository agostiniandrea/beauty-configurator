import _ from 'lodash';

let initState = {
    list: []
};

// ------------------------------------
// CONSTANTS
// ------------------------------------
export const INIT_DATA = 'MODELS/INIT_DATA';
export const SET_MODEL_BY_ID = 'MODELS/SET_MODEL_BY_ID';

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INIT_DATA: {
            return initDataFunc(state, action.payload);
        }
        case SET_MODEL_BY_ID: {
            return setModelFunc(state, action.payload);
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

export const setModelById = (payload) => {
    return { type: SET_MODEL_BY_ID, payload: payload };
};

// ------------------------------------
// FUNCTIONS
// ------------------------------------
function initDataFunc(state, payload) {
    let newState = _.cloneDeep(state);
    for (let model in payload.user.models) {
        let _model = payload.user.models[model];
        let _wb = [];
        for (let wb of payload.whyBuy) {
            if (wb.id == _model.order) {
                _wb = wb;
            }
        }
        _model = {
            selected: false,
            ..._model,
            features: _wb.features
        };
        newState.list.push(_model);
    }
    return newState;
}

function setModelFunc(state, id) {
    let newList = state.list.map((group) => {
        let selected = false;
        if (group.id === id) {
            selected = true;
        }
        return _.assign({}, group, {
            selected
        });
    });
    return {
        ...state,
        list: newList
    };
}