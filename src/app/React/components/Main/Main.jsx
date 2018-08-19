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
            <div className="main">
                <h1>{this.props.fullName}</h1>
                <Translate
                    content="modelsPage.title"
                    key="title"
                    with={{ fullName: this.props.fullName }}
                    unsafe
                />
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {
    chidren: PropTypes.element,
    fullName: PropTypes.string
};

export default Main;