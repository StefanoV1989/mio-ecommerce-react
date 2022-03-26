import React from 'react';
import { useDispatch } from 'react-redux';
import { addProdotto } from '../../redux/carrello/carrello.actions';

import './articolo.styles.scss';

const Articolo = (articolo) => {

	const {imageUrl, id} = articolo;

	const dispatch = useDispatch();

	return (
		<div className="articolo" data-testid={`prodotto-${id}`} style={{backgroundImage: `url('${imageUrl}')`}}>
			<div className='add-to-cart'>
				<button type='button' data-testid={`pulsante-${id}`} onClick={() => dispatch(addProdotto(articolo))}>AGGIUNGI AL CARRELLO</button>	
			</div>
		</div>
	);
};

export default Articolo;