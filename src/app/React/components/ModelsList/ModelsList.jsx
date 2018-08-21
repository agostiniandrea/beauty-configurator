import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';
import './ModelsList.scss';

class ModelsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article className="models-list">
                <Translate
                    className="models-list-title"
                    content="modelsList.title"
                    key="models-list-title"
                    unsafe
                />
                {this.props.children}
            </article>
        );
    }
}

ModelsList.propTypes = {
    children: PropTypes.array,
    list: PropTypes.array
};

export default ModelsList;