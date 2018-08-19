import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appConfig from './appConfig';
import models from './models';
import params from './params';
import sections from './sections';
/* import summary from './summary'; */
import user from './user';

export default combineReducers({
    appConfig,
    models,
    params,
    routing: routerReducer,
    sections,
    /* summary, */
    user
});