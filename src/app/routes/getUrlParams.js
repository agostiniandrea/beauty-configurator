import Store from 'Store';

export default (path, noPage) => {
    path = path || Store.getState().routing.locationBeforeTransitions.pathname;
    const keysUrl = {
        LANG: 'lang',
        ID: 'id',
        PAGE: 'page'
    };
    let pathToArray = path.split('/');
    let params = {
        lang: pathToArray[pathToArray.indexOf(keysUrl.LANG) + 1],
        id: pathToArray[pathToArray.indexOf(keysUrl.ID) + 1],
        page: pathToArray[pathToArray.indexOf(keysUrl.PAGE) + 1]
    };

    return noPage ? params : { ...params, page: pathToArray[1] };
};