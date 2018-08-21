import React, { Component } from 'react';
/* import Responsive from 'react-responsive'; */
/* import PropTypes from 'prop-types'; */
import './Header.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="page-header">
                {/* <Responsive minWidth={768}>
                    <div className="header-desktop"></div>
                </Responsive>
                <Responsive maxWidth={767}>
                    <div className="header-mobile"></div>
                </Responsive> */}
            </header>
        );
    }
}

/* Header.propTypes = {

}; */