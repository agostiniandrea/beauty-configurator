import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import params from './params';
import user from './user';

export default combineReducers({
    routing: routerReducer,
    params,
    user
});