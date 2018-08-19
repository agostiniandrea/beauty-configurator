import React, { Component } from 'react';
import Header from 'Containers/Header';
import Main from 'Containers/Main';
import ModelsList from 'Containers/ModelsList';
import ModelItem from 'Containers/ModelItem';
/* import Navigator from 'Containers/Navigator'; */
import Footer from 'Containers/Footer';
import PageWrapper from 'Containers/PageWrapper';

import './ModelsPage.scss';

class ModelsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageWrapper>
                <Header />
                <Main>
                    {/* <Navigator /> */}
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
                </Main>
                <Footer />
            </PageWrapper>
        );
    }
}

export default ModelsPage;