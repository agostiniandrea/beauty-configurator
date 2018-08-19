import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageWrapper.scss';

class PageWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                {this.props.children}
            </div>
        );
    }
}

PageWrapper.propTypes = {
    children: PropTypes.array
};

export default PageWrapper;