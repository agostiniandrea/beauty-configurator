import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Main.scss';

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="page-main">
                {this.props.children}
            </main>
        );
    }
}

Main.propTypes = {
    chidren: PropTypes.array
};