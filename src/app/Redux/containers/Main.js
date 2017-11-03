import { connect } from 'react-redux';
import Main from './../../React/components/Main/Main';

const mapStateToProps = (state) => {
    return {
        data: state.user
    };
};

export default connect(
    mapStateToProps,
    null
)(Main);