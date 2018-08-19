import { connect } from 'react-redux';
import { setModelById } from 'Modules/models';
import ModelItem from 'Components/ModelItem/ModelItem';

const mapDispatchToProps = (dispatch) => {
    return {
        configureFunc: (id) => {
            dispatch(setModelById(id));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ModelItem);