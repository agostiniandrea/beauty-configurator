import Main from './React/Main';

//## Routes
/**
* These are the routes of the app and the Parent component is the parent of all the routes
* The route params are:
* * path: is the path of the route
* * getComponent: assures that principal component of the page gets split into another chunk and than imported only when the relative route is active
* * routeParams: are the params send to the Parent. These are the params that can change from a route to another
*/
export default {
    getComponent: (nextState, cb) => {
        cb(null, Main);
    },
    indexRoute: { onEnter: (/* nextState, replace */) =>  {
        console.log('indexRoute');
    }},
    childRoutes: getChilds()
};

export const paramNames = ['nome'];

function getChilds() {
    return [{
        path: '/nome/:nome',
        indexRoute: {
            onEnter: (/* nextState, replace */) => console.log('prova router params')
        }
    },{
        path: '/*',
        indexRoute: {
            onEnter: (nextState, replace) => {
                console.log('child IndexRoute');
                replace('/nome/pippo');
            }
        }
    }];
}