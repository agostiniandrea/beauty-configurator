import React from 'react';
import Responsive from 'react-responsive';
import './Footer.scss';

const Footer = () => {
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
};

export default Footer;