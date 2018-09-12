import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Category.scss';

export default class Category extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="category">
                <title><h3>{this.props.title}</h3></title>
                {this.props.children}
            </section>
        );
    }
}

Category.propTypes = {
    children: PropTypes.array,
    title: PropTypes.string
};