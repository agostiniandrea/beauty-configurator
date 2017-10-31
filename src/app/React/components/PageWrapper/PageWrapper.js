import React from 'react';
import './PageWrapper.scss';

const PageWrapper = ({ children }) => {
    return (
        <div className="wrapper">        
            {children}
        </div>
    );
};

export default PageWrapper;