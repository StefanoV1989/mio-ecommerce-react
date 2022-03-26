import React from 'react';

import './carrello-icona.styles.scss';
import ShoppingIcon from '../../assets/img/shopping-cart.png';
import { toggleCarrello } from '../../redux/carrello/carrello.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectContoProdotti } from '../../redux/carrello/carrello.selectors';

const CarrelloIcona = () => {

	const dispatch = useDispatch();

	const numProdotti = useSelector(selectContoProdotti);

	return (
		<div className='il-carrello' onClick={() => dispatch(toggleCarrello())}>
			<img src={ShoppingIcon} className='icona-carrello' alt='Carrello' />
			<span data-testid="item-count" className='item-count'>{numProdotti}</span>
		</div>
	);
};

export default CarrelloIcona;