import { connect } from 'react-redux';
import Header from './../../React/components/Header/Header';

const mapStateToProps = (state) => {
    return {
        params: state.params
    };
};

export default connect(
    mapStateToProps,
    null
)(Header);