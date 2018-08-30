import _ from 'lodash';
import Api from 'Api';
import { endLoading } from 'Modules/loading';

// ------------------------------------
// CONSTANTS
// ------------------------------------
export const INIT_DATA = 'SECTIONS/INIT_DATA';
export const SET_DATA = 'SECTIONS/SET_DATA';
export const UNLOCK = 'SECTIONS/UNLOCK';

// ------------------------------------
// REDUCER
// ------------------------------------
export default function reducer(state = -1, action) {
    switch (action.type) {
        case INIT_DATA: {
            return initDataFunc(action.payload);
        }
        case SET_DATA: {
            return setDataFunc(state, action.payload);
        }
        case UNLOCK: {
            return unlockFunc(state, action.payload);
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

export const getData = (id) => {
    return (dispatch/* , getState */) => new Promise((resolve, reject) => {
        Api.getConfiguration(id)
            .then((configuration) => {
                dispatch(setData(configuration));
                resolve(configuration);
                dispatch(endLoading());
            })
            .catch((e) => {
                reject(e);
            });
    });
};
export const setData = (payload) => {
    return { type: SET_DATA, payload: payload };
};
export const unlock = (payload) => {
    return { type: UNLOCK, payload: payload };
};

// ------------------------------------
// FUNCTIONS
// ------------------------------------

function initDataFunc(payload) {
    let newState = _.cloneDeep(payload);
    let obj = [];
    for (let section of newState) {
        obj.push({
            ...section,
            active: section.id === 'home',
            selected: section.id === 'home'
        });
    }
    return obj;
}

function setDataFunc(state, payload) {
    let newState = _.cloneDeep(state);
    for (let view in payload.views) {
        populateObj(payload, payload.views[view], newState);
    }
    return newState;
}

function unlockFunc(state, payload) {
    let newState = _.cloneDeep(state);
    let obj = [];
    for (let section of newState) {
        obj.push({
            ...section,
            active: true,
            selected: section.id === payload
        });
    }
    return obj;
}

function populateObj(fullPayloadObj, curPayloadObj, obj) {
    //to be done better
    obj[curPayloadObj.id] = {
        ...obj[curPayloadObj.id],
        id: curPayloadObj.id,
        title: curPayloadObj.title,
        categories: getChildren(fullPayloadObj, curPayloadObj),
        description: curPayloadObj.description,
        order: curPayloadObj.order
    };
}

function getChildren(full, cur) {
    let obj = [];
    for (let category of cur.categories) {
        let _category = full.categories[category];
        let subCategories = [];
        for (let subCategory of cur.subCategories) {
            let _subCategory = full.subCategories[subCategory];
            subCategories.push({
                id: subCategory,
                ..._subCategory,
                options: getOptionsBySubcategory(full.options, subCategory)
            });
        }
        _category = {
            id: category,
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