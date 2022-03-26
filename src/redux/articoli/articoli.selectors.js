import { createSelector } from "reselect";

export const selectState = state => state.articoli;

export const selectArticoliState = state => state.articoli.prodotti;

export const selectProdotti = createSelector(
    [selectArticoliState],
    articoli => articoli ? Object.keys(articoli).map(key => articoli[key]) : []
)

export const selectProdottiCategoria = categoria => createSelector(
    [selectArticoliState],
    articoli => articoli ? articoli[categoria] : []
)

export const selectIsLoading = createSelector(
    [selectState],
    articoli => articoli.isLoading
)