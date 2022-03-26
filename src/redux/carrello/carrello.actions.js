import  { CarrelloActionTypes }  from "./carrello.types";

export const toggleCarrello = () => ({
    type: CarrelloActionTypes.TOGGLE_ANTEPRIMA,
})

export const addProdotto = prodotto => ({
    type: CarrelloActionTypes.ADD_PRODOTTO,
    payload: prodotto
})

export const removeProdotto = prodotto => ({
    type: CarrelloActionTypes.REMOVE_PRODOTTO,
    payload: prodotto
})

export const cancellaElemento = prodotto => ({
    type: CarrelloActionTypes.CANCELLA_ELEMENTO,
    payload: prodotto
})

export const svuotaCarrello = () => ({
    type: CarrelloActionTypes.SVUOTA_CARRELLO
})

export const svuotaCarrelloFrontEnd = () => ({
    type: CarrelloActionTypes.SVUOTA_CARRELLO_FE
})

export const retrieveCarrello = carrello => ({
    type: CarrelloActionTypes.RETRIEVE_CARRELLO,
    payload: carrello
})
