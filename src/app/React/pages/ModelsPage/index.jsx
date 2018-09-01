import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';
import ModelsList from 'Containers/ModelsList';
import ModelItem from 'Containers/ModelItem';
import PageWrapper from 'Containers/PageWrapper';

import './ModelsPage.scss';

export default class ModelsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading) {
            return null;
        }
        return (
            <PageWrapper>
                <title className="page-title">
                    <h1>{this.props.fullName}</h1>
                    <Translate
                        content="modelsPage.title"
                        key="models-page-title"
                        with={{ fullName: this.props.fullName }}
                        unsafe
                    />
                </title>
                <ModelsList>
                    {this.props.models.list.map((model, index) => (
                        <ModelItem
                            key={index}
                            {...model}
                        />
                    ))}
                </ModelsList>
            </PageWrapper>
        );
    }
}

ModelsPage.propTypes = {
    fullName: PropTypes.string,
    loading: PropTypes.bool,
    models: PropTypes.object
};