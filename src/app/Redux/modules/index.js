import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appConfig from './appConfig';
import loading from './loading';
import models from './models';
import navigation from './navigation';
import params from './params';
import sections from './sections';
/* import summary from './summary'; */
import user from './user';

let combinedObj = {
    appConfig,
    loading,
    models,
    navigation,
    params,
    routing: routerReducer,
    sections,
    /* summary, */
    user
};

const rootReducer = combineReducers(combinedObj);

export default rootReducer;