import { connect } from 'react-redux';
import ModelsPage from 'PagesComponents/ModelsPage';

const mapStateToProps = (state) => {
    return {
        fullName: state.user.description,
        loading: state.loading,
        models: state.models
    };
};

export default connect(
    mapStateToProps,
    null
)(ModelsPage);