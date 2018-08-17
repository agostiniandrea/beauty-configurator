import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appConfig from './appConfig';
import loading from './loading';
import params from './params';
import sections from './sections';
import user from './user';

export default combineReducers({
    appConfig,
    loading,
    params,
    routing: routerReducer,
    sections,
    user
});