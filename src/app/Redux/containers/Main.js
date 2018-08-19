import { connect } from 'react-redux';
import Main from './../../React/components/Main/Main';

const mapStateToProps = (state) => {
    return {
        fullName: state.user.description
    };
};

export default connect(
    mapStateToProps,
    null
)(Main);