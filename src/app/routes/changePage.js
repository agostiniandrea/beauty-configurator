import { push } from 'react-router-redux';
import store from 'Store';

const getCurrentParamsIdState = state => state.params;

const reactRouterReduxState = state => state.routing;
const separator = '/';

export default (page, change = false) => {
    const url = separator + concatCurrentParamsId() + separator + page;
    if (change) {
        store.dispatch(push(url));
    }
    return {
        url,
        active: isEnable(page)
    };
};

function concatCurrentParamsId() {
    let url = [];
    const currentParamsId = getCurrentParamsIdState(store.getState());
    for (let i in currentParamsId) {
        if (currentParamsId[i].length === 0) continue;
        url.push(i, currentParamsId[i]);
    }
    return url.join(separator);
}

function isEnable(page) {
    let currentPathname = reactRouterReduxState(store.getState()).locationBeforeTransitions.pathname;
    currentPathname = currentPathname.split(separator);
    let currentPage = currentPathname[9];
    return page === currentPage;
}