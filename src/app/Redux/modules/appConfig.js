import config from 'AppConfig';

const initState = config;

/**
 * ## defaultExport()
 */
export default (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};