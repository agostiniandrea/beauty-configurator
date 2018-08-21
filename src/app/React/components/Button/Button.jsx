import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.onClick}>
                {
                    this.props.children
                }
            </button>
        );
    }
}

Button.propTypes = {
    children: PropTypes.element,
    onClick: PropTypes.func
};

export default Button;