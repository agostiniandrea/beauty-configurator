import { connect } from 'react-redux';
import { setModelById } from 'Modules/models';
import { getData } from 'Modules/sections';
import changePage from 'Routes/changePage';
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
            console.log('configureFunc');
            /* dispatch(setModelById(id));
            dispatch(getData(id)); */
            changePage('1', true);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelItem);