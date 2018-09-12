import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SubCategory.scss';

export default class SubCategory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="subcategory">
                <title><h4>{this.props.title}</h4></title>
                {this.props.children}
            </section>
        );
    }
}

SubCategory.propTypes = {
    children: PropTypes.array,
    title: PropTypes.string
};