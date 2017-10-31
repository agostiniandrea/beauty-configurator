import React from 'react';
import Responsive from 'react-responsive';
import './Header.scss';

const Header = () => {
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
};

export default Header;