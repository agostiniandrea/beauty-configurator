import { connect } from 'react-redux';
import _ from 'lodash';
import Navigator from 'Components/Navigator';

const mapStateToProps = (state) => {
    return {
        current: _.find(state.sections, { title: state.params.page }),
        href: window.location.href,
        views: state.sections
    };
};

export default connect(
    mapStateToProps,
    null
)(Navigator);