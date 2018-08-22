import { connect } from 'react-redux';
import { setModelById } from 'Modules/models';
import { getData } from 'Modules/sections';
import ModelItem from 'Components/ModelItem';

const mapDispatchToProps = (dispatch) => {
    return {
        configureFunc: (id) => {
            dispatch(setModelById(id));
            dispatch(getData(id));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ModelItem);