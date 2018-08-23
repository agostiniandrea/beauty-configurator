import Store from 'Store';

export default (path, noPage) => {
    path = path || Store.getState().routing.locationBeforeTransitions.pathname;
    const keysUrl = {
        LANG: 'lang',
        ID: 'id',
        STEP: 'step'
    };
    let pathToArray = path.split('/');
    let params = {
        lang: pathToArray[pathToArray.indexOf(keysUrl.LANG) + 1],
        id: pathToArray[pathToArray.indexOf(keysUrl.ID) + 1],
        step: pathToArray[pathToArray.indexOf(keysUrl.STEP) + 1]
    };

    return noPage ? params : { ...params, page: pathToArray[1] };
};