import _ from 'lodash';

// ------------------------------------
// CONSTANTS
// ------------------------------------
export const INIT_DATA = 'SECTIONS/INIT_DATA';
export const SET_DATA = 'SECTIONS/SET_DATA';

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = -1, action) {
    switch (action.type) {
        case INIT_DATA: {
            return [action.payload];
        }
        case SET_DATA: {
            return setDataFunc(state, action.payload);
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
export const setData = (payload) => {
    return { type: SET_DATA, payload: payload };
};

// ------------------------------------
// FUNCTIONS
// ------------------------------------

function setDataFunc(state, payload) {
    let newState = _.cloneDeep(state);
    for (let view in payload.views) {
        populateObj(payload, payload.views[view], newState);
    }
    return newState;
}

function populateObj(fullPayloadObj, curPayloadObj, obj) {
    obj.push({
        id: curPayloadObj.id,
        title: curPayloadObj.title,
        description: curPayloadObj.description,
        categories: getChildren(fullPayloadObj, curPayloadObj)
    });
}

function getChildren(full, cur) {
    let obj = [];
    for (let category of cur.categories) {
        let _category = full.categories[category];
        let subCategories = [];
        for (let subCategory of cur.subCategories) {
            let _subCategory = full.subCategories[subCategory];
            subCategories.push({
                ..._subCategory,
                options: getOptionsBySubcategory(full.options, subCategory)
            });
        }
        _category = {
            ..._category,
            subCategories
        };
        obj.push(_category);
    }
    return obj;
}

function getOptionsBySubcategory(optObj, id) {
    let options = [];
    for (let opt in optObj) {
        if (optObj[opt].subCategoryID == id) {
            options.push(optObj[opt]);
        }
    }
    return options;
}