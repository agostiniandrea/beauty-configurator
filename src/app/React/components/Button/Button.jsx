import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';
import './Button.scss';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Translate
                content={this.props.text}
                component="button"
                onClick={this.props.onClick}
            />
        );
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string
};

export default Button;