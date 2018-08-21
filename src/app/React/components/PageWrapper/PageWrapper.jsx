import React, { Component } from 'react';
import Footer from 'Containers/Footer';
import Header from 'Containers/Header';
import Main from 'Containers/Main';
import PropTypes from 'prop-types';
import './PageWrapper.scss';

class PageWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="page-wrapper">
                <Header />
                <Main>
                    {this.props.children}
                </Main>
                <Footer />
            </main>
        );
    }
}

PageWrapper.propTypes = {
    children: PropTypes.object
};

export default PageWrapper;