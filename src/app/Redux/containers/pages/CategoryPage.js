import { connect } from 'react-redux';
import CategoryPage from 'PagesComponents/CategoryPage';

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        models: state.sections
    };
};

export default connect(
    mapStateToProps,
    null
)(CategoryPage);