import { connect } from 'react-redux';
import Header from 'Components/Header';

const mapStateToProps = (state) => {
    return {
        params: state.params
    };
};

export default connect(
    mapStateToProps,
    null
)(Header);