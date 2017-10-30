import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import modulo from './modulo';
import params from './params';

export default combineReducers({
    modulo,
    routing: routerReducer,
    params
});