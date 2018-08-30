import { connect } from 'react-redux';
import _ from 'lodash';
import CategoryPage from 'PagesComponents/CategoryPage';

const mapStateToProps = (state) => {
    return {
        current: _.find(state.sections, { title: state.params.page }),
        loading: state.loading
    };
};

export default connect(
    mapStateToProps,
    null
)(CategoryPage);