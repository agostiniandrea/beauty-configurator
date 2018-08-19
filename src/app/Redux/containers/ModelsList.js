import { connect } from 'react-redux';
import ModelsList from 'Components/ModelsList/ModelsList';

const mapStateToProps = (state) => {
    return {
        list: state.models.list
    };
};

export default connect(
    mapStateToProps,
    null
)(ModelsList);