import React, { Component } from 'react';
import Footer from 'Containers/Footer';
import Header from 'Containers/Header';
import Main from 'Containers/Main';
import PropTypes from 'prop-types';
import './PageWrapper.scss';

export default class PageWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading) return null;
        return ([
            <Header key="header" />,
            <Main key="main">
                {this.props.children}
            </Main>,
            <Footer key="footer" />
        ]);
    }
}

PageWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array, PropTypes.element, PropTypes.object
    ]),
    loading: PropTypes.bool
};