import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';
import './ModelsList.scss';

export default class ModelsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article className="models-list">
                <title>
                    <Translate
                        className="models-list-title"
                        component="h3"
                        content="modelsList.title"
                        key="models-list-title"
                        unsafe
                    />
                </title>
                {this.props.children}
            </article>
        );
    }
}

ModelsList.propTypes = {
    children: PropTypes.array,
    list: PropTypes.array
};