import React, { Component } from 'react';
import CategoryPage from 'PagesContainers/CategoryPage';
import ModelsPage from 'PagesContainers/ModelsPage';
import handler from '../handler';
import Store from 'Store';
/* import getUrlParams from 'Routes/getUrlParams'; */

//## Routes
/**
* These are the routes of the app and the Parent component is the parent of all the routes
* The route params are:
* * path: is the path of the route
* * getComponent: assures that principal component of the page gets split into another chunk and than imported only when the relative route is active
* * routeParams: are the params send to the Parent. These are the params that can change from a route to another
*/
let firstLanding = true;
class Parent extends Component {
    render() {
        switch (this.props.routes[1].section) {
            case 'homepage':
                if (Store.getState().loading) {
                    return null;
                } else {
                    return <ModelsPage />;
                }
            case 'page1':
                return <CategoryPage />;
            case 'page2':
                return <CategoryPage />;
            case 'page3':
                return <CategoryPage />;
            case 'page4':
                return <CategoryPage />;
            default:
                return null;
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

export const paramNames = ['lang', 'id', 'page'];

function getChilds() {
    const pages = ['page1', 'page2', 'page3', 'page4'];
    let children = [
        {
            path: '/',
            section: null,
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
                onEnter: () => {
                    firstLanding = false;
                }
            }
        }
    ];
    for (let page in pages) {
        children.push({
            path: '/lang/:lang/id/:id/page/' + pages[page],
            section: pages[page],
            indexRoute: {
                onEnter: (nextState, replace) => {
                    if (firstLanding) {
                        firstLanding = false;
                        replace('/lang/it/id/MUAIT201801/page/home/');
                    }
                    /* console.log(''); */
                }
            }
        });
    }
    return children;
}