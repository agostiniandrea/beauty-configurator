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
    let newState = _.cloneDeep(state);
    for (let step in payload.steps) {
        populateObj(payload, payload.steps[step], newState, 'categories');
    }
    return newState;
}

function populateObj(fullPayloadObj, curPayloadObj, obj, childrenPropName) {
    obj[curPayloadObj.order] = {
        id: curPayloadObj.id,
        title: curPayloadObj.title,
        description: curPayloadObj.description
    };
    if (childrenPropName) {
        populateProperty(fullPayloadObj, curPayloadObj, obj, childrenPropName);
    }
}

function populateProperty(fullPayloadObj, curPayloadObj, obj, childrenPropName) {
    if (curPayloadObj[childrenPropName] && fullPayloadObj[childrenPropName]) {
        obj[curPayloadObj.order][childrenPropName] = [];
    }
}