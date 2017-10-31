import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import params from './params';

export default combineReducers({
    routing: routerReducer,
    params
});