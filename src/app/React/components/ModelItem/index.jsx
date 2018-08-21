import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/Button';
import './ModelItem.scss';

export default class ModelItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="model-item col-xs-12">
                <header>
                    <h2>{this.props.description}</h2>
                </header>
                <main>
                </main>
                <footer>
                    <Button text="modelItem.configure" onClick={() => this.props.configureFunc(this.props.id)} />
                </footer>
            </section>
        );
    }
}

ModelItem.propTypes = {
    configureFunc: PropTypes.func,
    description: PropTypes.string,
    id: PropTypes.string,
    features: PropTypes.array
};