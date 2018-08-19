import _ from 'lodash';

let initState = {
    list: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'MODELS/INIT_DATA': {
            return initData(state, action.payload);
        }
        /* case 'MODELS/SET_DATA': {
            return setData(state, action.payload);
        } */
        default:
            return state;
    }
};

function initData(state, payload) {
    let newState = _.cloneDeep(state);
    for (let model in payload.user.models) {
        let _model = payload.user.models[model];
        for (let wb of payload.whyBuy) {
            if (wb.id === _model.id) {
                _model = {
                    ..._model,
                    ...wb
                };
            }
        }
        newState.list.push(_model);
    }
    return newState;
}