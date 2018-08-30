import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    loading: PropTypes.bool,
    models: PropTypes.object,
    user: PropTypes.object
};