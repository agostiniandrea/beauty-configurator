import React, { Component } from 'react';
import Navigator from 'Containers/Navigator';
import PageWrapper from 'Containers/PageWrapper';

import './CategoryPage.scss';

class CategoryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageWrapper>
                <p>Category page</p>
                <Navigator />
            </PageWrapper>
        );
    }
}

export default CategoryPage;