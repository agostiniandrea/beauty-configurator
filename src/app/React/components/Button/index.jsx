import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';
import UIButton from '@material-ui/core/Button';
import './Button.scss';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <UIButton variant="contained" color="primary" href={this.props.href} onClick={this.props.onClick}>
                <Translate content={this.props.text} />
            </UIButton>
        );
        /* return <Translate content={this.props.text} component="button" onClick={this.props.onClick} />; */
    }
}

Button.propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string
};