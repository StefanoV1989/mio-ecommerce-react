export const aggiungiProdotto = (prodottiCarrello, prodottoDaAggiungere) => {
    const prodottoInCarrello = prodottiCarrello.find(prodotto => prodotto.id === prodottoDaAggiungere.id);

    if(prodottoInCarrello)
    {
        return prodottiCarrello.map(prodotto => prodotto.id === prodottoDaAggiungere.id ? { ...prodotto, quantita: prodotto.quantita + 1 } : prodotto);
    }

    return [...prodottiCarrello, {...prodottoDaAggiungere, quantita: 1}];
}

export const rimuoviProdotto = (prodottiCarrello, prodottoDaRimuovere) => {
    const prodottoInCarrello = prodottiCarrello.find(prodotto => prodotto.id === prodottoDaRimuovere.id);

    if(prodottoInCarrello.quantita === 1)
    {
        return prodottiCarrello.filter( prodotto => prodotto.id !== prodottoDaRimuovere.id)
    }

    return prodottiCarrello.map(prodotto => prodotto.id === prodottoDaRimuovere.id ? { ...prodotto, quantita: prodotto.quantita - 1 } : prodotto)
}