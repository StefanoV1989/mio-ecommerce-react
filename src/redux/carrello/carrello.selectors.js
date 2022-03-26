import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectProdottiInCarrello = createSelector(
    [selectCart],
    prodotti => {
        return prodotti.carrelloItems
    }
);

export const selectContoProdotti = createSelector(
    [selectProdottiInCarrello],
    prodotti => prodotti.reduce((contoQuantita, prodotto) => contoQuantita + prodotto.quantita, 0)
);

export const selectTotaleCarrello = createSelector(
    [selectProdottiInCarrello],
    carrelloItems => carrelloItems.reduce((contoPrezzo, prodotto) => contoPrezzo + (prodotto.price * prodotto.quantita), 0)
);