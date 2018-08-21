import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* import Translate from 'react-translate-component'; */
import './Navigator.scss';

class Navigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navigator">
                <ul>
                    {/* 
                        this.props.views.map((view) => {
                            return <li key={`navigator-${view.id}`}>{view.title}</li>;
                        })
                     */}
                </ul>
            </nav>
        );
    }
}

Navigator.propTypes = {
    views: PropTypes.array
};

export default Navigator;