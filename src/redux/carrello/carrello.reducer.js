import { CarrelloActionTypes } from './carrello.types';
import { aggiungiProdotto, rimuoviProdotto } from './carrello.utils';

const INITIAL_STATE = {
    hidden: true,
    carrelloItems: []
};

const carrelloReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CarrelloActionTypes.TOGGLE_ANTEPRIMA:
            return {
                ...state,
                hidden: !state.hidden,
            }
        case CarrelloActionTypes.ADD_PRODOTTO:
            return {
                ...state,
                carrelloItems: aggiungiProdotto(state.carrelloItems, action.payload)
            }
        case CarrelloActionTypes.REMOVE_PRODOTTO:
            return {
                ...state,
                carrelloItems: rimuoviProdotto(state.carrelloItems, action.payload)
            }
        case CarrelloActionTypes.CANCELLA_ELEMENTO:
            return {
                ...state,
                carrelloItems: state.carrelloItems.filter(prodotto => prodotto.id !== action.payload.id)
            }
        case CarrelloActionTypes.SVUOTA_CARRELLO_FE:
        case CarrelloActionTypes.SVUOTA_CARRELLO:
            return {
                ...state,
                carrelloItems: []
            }
        case CarrelloActionTypes.RETRIEVE_CARRELLO:
            return {
                ...state,
                carrelloItems: action.payload
            }
        default:
            return state
    }
}

export default carrelloReducer;