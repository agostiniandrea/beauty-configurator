/**
 * @author Giuseppe Vincenzi
 */
//La costante associata all'action il quale viene scatenata al cambio dell'hash url da react-router-redux.
import { LOCATION_CHANGE } from 'react-router-redux';
import { getUrlParams } from '../';
//stato iniziale
const initialState = null;
/**
 * Salva/Aggiorna lo stato con gli attuali urlID.
 */
export default (state = initialState, { type, payload } = {}) => {
    if (type === LOCATION_CHANGE) {
        const { pathname } = payload;
        return { ...state, ...getUrlParams(pathname, true) };
    }
    return state;
};