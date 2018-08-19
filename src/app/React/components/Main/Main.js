import React, { Component } from 'react';
import Translate from 'react-translate-component';
import './Main.scss';

export default class Main extends Component {
    render() {
        return (
            <div className="main">
                <h3>{this.props.fullName}</h3>
                <Translate
                    key="title"
                    content="title"
                    with={{ fullName: this.props.fullName }}
                    unsafe />
                {
                    this.props.children
                }
            </div>
        );
    }
}