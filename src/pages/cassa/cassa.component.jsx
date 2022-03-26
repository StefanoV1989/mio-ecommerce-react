import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CassaItem from '../../components/cassa-item/cassa-item.component';
import { svuotaCarrello, toggleCarrello } from '../../redux/carrello/carrello.actions';
import { selectProdottiInCarrello, selectTotaleCarrello } from '../../redux/carrello/carrello.selectors';
import { Button } from '../../styled-components/button';

import './cassa.styles.scss';

const Cassa = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(toggleCarrello())
	}, [dispatch])

	const elementi = useSelector(selectProdottiInCarrello);
	const totale = useSelector(selectTotaleCarrello);

	return (
		<div className="cassa">
			<h1>Carrello Utente</h1>
			<div className='cassa-header'>
				<div className='header-block'>
					<span></span>
				</div>
				<div className='header-block'>
					<span>Prodotto</span>
				</div>
				<div className='header-block'>
					<span>Descrizione</span>
				</div>

				<div className='header-block'>
					<span>Prezzo</span>
				</div>
				<div className='header-block'>
					<span>Quantità</span>
				</div>
			</div>
			{
				(elementi.length > 0) ? elementi.map(prodotto => (
					<CassaItem key={prodotto.id} {...prodotto} />
				)) : null
			}
			<div className='riepilogo-carrello'>
				<div className='svuota'>
					<Button data-testid="svuota" onClick={() => dispatch(svuotaCarrello())}>SVUOTA CARRELLO</Button>
				</div>
				<div className='totale'>
					<span>TOTALE: {totale}€</span>
				</div>
			</div>
		</div>
	)
};

export default Cassa;