import React, { Component } from 'react';
import ModelsPage from 'Containers/page/ModelsPage';
import handler from '../handler';
/* import getUrlParams from 'Routes/getUrlParams'; */
import getPage from 'Routes/getPage';

//## Routes
/**
* These are the routes of the app and the Parent component is the parent of all the routes
* The route params are:
* * path: is the path of the route
* * getComponent: assures that principal component of the page gets split into another chunk and than imported only when the relative route is active
* * routeParams: are the params send to the Parent. These are the params that can change from a route to another
*/

class Parent extends Component {
    render() {
        if (this.props.routes[1].section === 'homepage') {
            return <ModelsPage />;
        }
        else {
            return <div></div>;
        }
    }
}

export default {
    getComponent: (nextState, cb) => {
        if (nextState.location.pathname == '/') {
            cb(null, null);
            return;
        }
        handler(nextState)
            .then(() => {
                cb(null, Parent);
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    },
    indexRoute: {
        onEnter: (/* nextState, replace */) => {
            console.log('indexRoute');
        }
    },
    childRoutes: getChilds()
};

export const paramNames = ['lang', 'id', 'step'];

function getChilds() {
    const pages = ['1', '2', '3', '4'];
    //replace('lang/it/id/MUAIT201801');
    let children = [
        {
            path: '/',
            section: '0',
            indexRoute: {
                onEnter: (nextState, replace) => {
                    replace('/lang/it/id/MUAIT201801/page/home/');
                }
            }
        },
        {
            path: '/lang/:lang/id/:id/page/home',
            section: 'homepage',
            indexRoute: {
                onEnter: (/* nextState, replace */) => {
                }
            }
        }
    ];
    for (let page in pages) {
        children.push({
            path: '/lang/:lang/id/:id/page/' + pages[page],
            section: pages[page],
            indexRoute: {
                onEnter: (/* nextState, replace */) => {
                    /* console.log(''); */
                }
            }
        });
    }
    return children;
}