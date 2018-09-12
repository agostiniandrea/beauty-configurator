import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/Button';
import Feature from 'Components/Feature';
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
                    <ul className="features-list">
                        {this.props.features && this.props.features.map((feature) =>
                            <Feature key={feature.id} text={feature.value} />
                        )}
                    </ul>
                </main>
                <footer>
                    <Button
                        onClick={() => {
                            this.props.configureFunc(this.props.selected, this.props.id, url);
                        }}
                        text="modelItem.configure"
                    />
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
    routing: PropTypes.string,
    selected: PropTypes.bool
};