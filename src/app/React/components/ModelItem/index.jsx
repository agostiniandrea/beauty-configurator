import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/Button';
import './ModelItem.scss';

export default class ModelItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const url = this.props.href.replace('home', this.props.nextStep);
        return (
            <section className="model-item">
                <header>
                    <h2>{this.props.description}</h2>
                </header>
                <main>
                </main>
                <footer>
                    <Button href={url} onClick={() => this.props.configureFunc(this.props.nextStep, this.props.id)} text="modelItem.configure" />
                </footer>
            </section>
        );
    }
}

ModelItem.propTypes = {
    configureFunc: PropTypes.func,
    description: PropTypes.string,
    id: PropTypes.string,
    features: PropTypes.array,
    nextStep: PropTypes.string,
    routing: PropTypes.string
};