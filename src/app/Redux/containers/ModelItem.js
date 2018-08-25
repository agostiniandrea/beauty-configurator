import { connect } from 'react-redux';
import { setModelById } from 'Modules/models';
import { getData } from 'Modules/sections';
import ModelItem from 'Components/ModelItem';

const mapStateToProps = (state) => {
    return {
        nextStep: state.sections[1].id,
        routing: (state.routing.locationBeforeTransitions || {}).pathname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        configureFunc: (id) => {
            dispatch(setModelById(id));
            dispatch(getData(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelItem);