import React, { Component } from 'react';
import './Main.scss';

export default class Main extends Component {
    render() {
        const { name, surname } = this.props.data;
        return (
            <div className="main">{name + ' ' + surname}</div>
        );
    }
}