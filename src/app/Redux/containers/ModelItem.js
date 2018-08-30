import { connect } from 'react-redux';
import { startLoading } from 'Modules/loading';
import { setModelById } from 'Modules/models';
import { getData, unlock as unlockSections } from 'Modules/sections';
import ModelItem from 'Components/ModelItem';

const mapStateToProps = (state) => {
    return {
        nextStep: state.sections[1].title,
        href: window.location.href
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        configureFunc: (nextSectionId, id) => {
            dispatch(startLoading());
            dispatch(setModelById(id));
            dispatch(unlockSections(nextSectionId));
            dispatch(getData(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelItem);