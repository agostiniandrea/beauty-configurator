import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Feature.scss';

export default class Feature extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="feature">{this.props.text}</li>
        );
    }
}

Feature.propTypes = {
    text: PropTypes.string
};