import React from 'react';
import { useDispatch } from 'react-redux';
import { addProdotto, cancellaElemento, removeProdotto } from '../../redux/carrello/carrello.actions';

import './cassa-item.styles.scss';

const CassaItem = (prodotto) => {

	const {imageUrl, name, price, quantita} = prodotto;

	const dispatch = useDispatch();
	
	return (
		<div className="cassa-item">
			<div className='remove-button' onClick={() => dispatch(cancellaElemento(prodotto))}>
				&#10005;
			</div>
			<div className='image-container'>
				<img src={imageUrl} alt='Prodotto' />
			</div>
			<span className='name'>{name}</span>
			
			<span className='price'>{price} €</span>
			<span className='quantita'>
				<span className='arrow' onClick={() => dispatch(removeProdotto(prodotto))}>&#10094;</span>
				<span className='value'>{quantita}</span>
				<span className='arrow' onClick={() => dispatch(addProdotto(prodotto))}>&#10095;</span>
			</span>
		</div>
	);
};

export default CassaItem;