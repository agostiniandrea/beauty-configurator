import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appConfig from './appConfig';
import params from './params';
import sections from './sections';
/* import summary from './summary'; */
import user from './user';

export default combineReducers({
    appConfig,
    params,
    routing: routerReducer,
    sections,
    /* summary, */
    user
});