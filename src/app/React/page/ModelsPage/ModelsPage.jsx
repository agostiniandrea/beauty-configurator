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
                        {
                            this.props.models.list.map((model) => {
                                return (
                                    <ModelItem
                                        key={`model-${model.id}`}
                                        description={model.description}
                                        id={model.id}
                                        whyBuy={model.features}
                                    />
                                );
                            })
                        }
                    </ModelsList>
            </PageWrapper>
        );
    }
}

export default ModelsPage;