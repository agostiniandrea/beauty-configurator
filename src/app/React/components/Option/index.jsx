import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Option.scss';

export default class Option extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="option">
                <title>{this.props.title}</title>
            </section>
        );
    }
}

Option.propTypes = {
    title: PropTypes.string
};