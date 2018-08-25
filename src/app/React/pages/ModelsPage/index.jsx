import React, { Component } from 'react';
import ModelsList from 'Containers/ModelsList';
import ModelItem from 'Containers/ModelItem';
import PageWrapper from 'Containers/PageWrapper';

import './ModelsPage.scss';

class ModelsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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

export default ModelsPage;