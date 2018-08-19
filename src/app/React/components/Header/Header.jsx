import React, { Component } from 'react';
import Responsive from 'react-responsive';
/* import PropTypes from 'prop-types'; */
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <Responsive minWidth={768}>
                    <div className="header-desktop"></div>
                </Responsive>
                <Responsive maxWidth={767}>
                    <div className="header-mobile"></div>
                </Responsive>
            </div>
        );
    }
}

/* Footer.propTypes = {

}; */

export default Header;