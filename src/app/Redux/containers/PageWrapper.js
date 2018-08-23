import { connect } from 'react-redux';
import PageWrapper from 'Components/PageWrapper';

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    };
};

export default connect(
    mapStateToProps,
    null
)(PageWrapper);