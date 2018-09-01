import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Category from 'Components/Category';
import Option from 'Components/Option';
import SubCategory from 'Components/SubCategory';
import Navigator from 'Containers/Navigator';
import PageWrapper from 'Containers/PageWrapper';

import './SectionPage.scss';

export default class SectionPage extends Component {
    constructor(props) {
        super(props);
    }

    getOptions(options) {
        return options && options.map((option) => (
            <Option key={option.order} title={option.description} />
        ));
    }

    getSubCategories(subCategories) {
        return subCategories && subCategories.map((subCategory) => (
            <SubCategory key={subCategory.order} title={subCategory.description}>
                {this.getOptions(subCategory.options)}
            </SubCategory>
        ));
    }

    getCategories() {
        return this.props.current.categories && this.props.current.categories.map((category) => (
            <Category key={category.order} title={category.description}>
                {this.getSubCategories(category.subCategories)}
            </Category>
        ));
    }

    render() {
        if (this.props.loading) {
            return null;
        }
        return (
            <PageWrapper>
                <Navigator />
                <article className="section-container">
                    <title className="section-description">{this.props.current.description}</title>
                    {this.getCategories()}
                </article>
            </PageWrapper>
        );
    }
}

SectionPage.propTypes = {
    current: PropTypes.object,
    loading: PropTypes.bool
};