import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigator from 'Containers/Navigator';
import PageWrapper from 'Containers/PageWrapper';

import './CategoryPage.scss';

export default class CategoryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        if (this.props.loading) {
            return null;
        }
        return (
            <PageWrapper>
                <Navigator />
                <section>
                    {this.props.current && this.props.current.categories.map((category) => <article key={category.order}>{category.title}</article>)}
                </section>
            </PageWrapper>
        );
    }
}

CategoryPage.propTypes = {
    current: PropTypes.object,
    loading: PropTypes.bool
};