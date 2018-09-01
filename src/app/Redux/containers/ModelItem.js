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
        configureFunc: (selected, id, url) => {
            if (!selected) {
                dispatch(startLoading());
                dispatch(setModelById(id));
                dispatch(unlockSections());
                dispatch(getData(id));
            }
            window.location.replace(url);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelItem);