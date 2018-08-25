import { push } from 'react-router-redux';
import store from 'Store';

export default (page, change = false) => {
    if (change) {
        store.dispatch(push(page));
    }
    return {
        page,
        active: true
    };
};