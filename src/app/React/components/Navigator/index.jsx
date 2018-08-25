import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* import Translate from 'react-translate-component'; */
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import './Navigator.scss';

export default class Navigator extends Component {
    constructor(props) {
        super(props);
    }
    /* <nav className="navigator">
        <ul>
            {this.props.views.map(view => <li key={`navigator-${view.id}`}>{view.title}</li>)}
        </ul>
    </nav> */

    render() {
        return (
            <AppBar position="static">
                <Tabs value={this.props.views.indexOf(this.props.current)} /*onChange={this.handleChange} */>
                    {this.props.views.map(view => <Tab key={view.id} label={view.title} href={this.getNextStep(view.title)} />)}
                </Tabs>
            </AppBar>
        );
    }

    getNextStep(view) {
        let href = this.props.href;
        let newUrl = href.replace(this.props.current.title, view);
        return newUrl;
    }
}

Navigator.propTypes = {
    current: PropTypes.object,
    href: PropTypes.string,
    views: PropTypes.array
};