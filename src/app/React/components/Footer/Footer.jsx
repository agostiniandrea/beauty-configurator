import React, { Component } from 'react';
import Responsive from 'react-responsive';
/* import PropTypes from 'prop-types'; */
import './Footer.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                <Responsive minWidth={768}>
                    <div className="footer-desktop"></div>
                </Responsive>
                <Responsive maxWidth={767}>
                    <div className="footer-mobile"></div>
                </Responsive>
            </div>
        );
    }
}

/* Footer.propTypes = {

}; */

export default Footer;