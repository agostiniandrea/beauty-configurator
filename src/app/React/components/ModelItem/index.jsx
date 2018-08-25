import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
/* import Button from 'Components/Button'; */
import './ModelItem.scss';

export default class ModelItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const url = this.props.routing.replace('home', this.props.nextStep);
        return (
            <section className="model-item col-xs-12">
                <header>
                    <h2>{this.props.description}</h2>
                </header>
                <main>
                </main>
                <footer>
                    <Link to={url} onClick={() => this.props.configureFunc(this.props.id)}>
                        <p>GO AHEAD</p>
                    </Link>
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
    nextStep: PropTypes.number,
    routing: PropTypes.string
};