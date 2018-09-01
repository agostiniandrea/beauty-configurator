import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';
import './Button.scss';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Translate
                component="button"
                content={this.props.text}
                onClick={this.props.onClick}
            />
        );
    }
}

Button.propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string
};