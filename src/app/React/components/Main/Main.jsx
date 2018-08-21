import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';
import './Main.scss';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="main">
                <title>
                    <h1>{this.props.fullName}</h1>
                    <Translate
                        content="modelsPage.title"
                        key="title"
                        with={{ fullName: this.props.fullName }}
                        unsafe
                    />
                </title>
                {this.props.children}
            </main>
        );
    }
}

Main.propTypes = {
    chidren: PropTypes.array,
    fullName: PropTypes.string
};

export default Main;