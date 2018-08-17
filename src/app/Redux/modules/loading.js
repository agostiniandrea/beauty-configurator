export default (state = false, action) => {
    switch (action.type) {
        case 'LOADING/START_LOADING': {
            return true;
        }
        case 'LOADING/END_LOADING': {
            return false;
        }
        default:
            return state;
    }
};