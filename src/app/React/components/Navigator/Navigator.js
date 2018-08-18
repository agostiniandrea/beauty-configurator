import React, { Component } from 'react';
/* import Translate from 'react-translate-component'; */
import './Navigator.scss';

export default class Navigator extends Component {
    render() {
        return (
            <div className="navigator">
                <ul>
                    {/* 
                        this.props.views.map((view) => {
                            return <li key={`navigator-${view.id}`}>{view.title}</li>;
                        })
                     */}
                </ul>
            </div>
        );
    }
}