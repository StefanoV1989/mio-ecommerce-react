import { ArticoliActionTypes } from './articoli.types';

const INITIAL_STATE = {
    prodotti: null,
    isLoading: false,
    errore: null
};

const articoliReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ArticoliActionTypes.GET_ARTICOLI_START:
            return {
                ...state,
                isLoading: true
            }
        case ArticoliActionTypes.GET_ARTICOLI_SUCCESS:
            return {
                ...state,
                isLoading: false,
                prodotti: action.payload
            }
        case ArticoliActionTypes.GET_ARTICOLI_FAIL:
            return {
                ...state,
                isLoading: false,
                errore: action.payload
            }
        default:
            return state
    }
}

export default articoliReducer;