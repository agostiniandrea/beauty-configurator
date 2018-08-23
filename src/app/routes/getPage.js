import Store from 'Store';

export default getPage;

function getPage(){
    let page = Store.getState().routing.locationBeforeTransitions.pathname.split('/');
    page = page[9];
    return page;
}