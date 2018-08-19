/* import _ from 'lodash'; */

export default (state = -1, action) => {
    switch (action.type) {
        case 'SUMMARY/SET_DATA': {
            return setData(action.payload);
        }
        default:
            return state;
    }
};

function setData(payload) {
    let views = [];
    for (let view in payload) {
        views.push({
            active: false,
            id: payload[view].id,
            order: payload[view].order,
            title: payload[view].id,
            description: payload[view].description,
        });
    }
    return {
        views
    };
}