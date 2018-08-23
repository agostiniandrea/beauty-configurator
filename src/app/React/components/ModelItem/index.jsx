import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Button from 'Components/Button';
import './ModelItem.scss';

export default class ModelItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <section className="model-item col-xs-12">
                <header>
                    <h2>{this.props.description}</h2>
                </header>
                <main>
                </main>
                <footer>
                    {/* <Link to={this.props.routing.replace('home', this.props.nextStep)}>
                        <p>GO AHEAD</p>
                    </Link> */}
                    <button onClick={() => this.props.configureFunc(this.props.id)}>CLICK</button>
                    {/* <Button
                        onClick={this.props.configureFunc(this.props.id)}
                        routing={this.props.routing}
                        text="modelItem.configure"
                    /> */}
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