import React, { Component } from 'react';
import Header from './Redux/containers/Header';
import Main from './Redux/containers/Main';
import Navigator from './Redux/containers/Navigator';
import Footer from './Redux/containers/Footer';
import PageWrapper from './Redux/containers/PageWrapper';
import handler from './handler.js';

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
        return (
            <PageWrapper>
                <Header />
                <Main>
                    <Navigator />
                </Main>
                <Footer />
            </PageWrapper>
        );
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

export const paramNames = ['lang', 'id'];

function getChilds() {
    return [
        {
            path: '/lang/:lang/id/:id',
            indexRoute: {
                onEnter: (/* nextState, replace */) => {
                    /* console.log(''); */
                }
            }
        },
        {
            path: '/*',
            indexRoute: {
                onEnter: (nextState, replace) => {
                    replace('lang/it/id/MUAIT201801');
                }
            }
        }
    ];
}