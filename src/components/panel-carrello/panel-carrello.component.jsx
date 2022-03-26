import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProdottiInCarrello } from '../../redux/carrello/carrello.selectors';

import { Button } from '../../styled-components/button';
import PanelCarrelloItem from '../panel-carrello-item/panel-carrello-item.component';
import './panel-carrello.styles.scss';

const PanelCarrello = () => {

	const navigate = useNavigate();

	const elementi = useSelector(selectProdottiInCarrello);

	return (
		<div className="panel-carrello">
			<div className='carrello-items'>
				{
					elementi.length > 0 ?
						elementi.map(articolo => (
							<PanelCarrelloItem key={articolo.id} {...articolo} />
						))
						:
						(<span className='empty-message'>Carrello vuoto</span>)
				}

			</div>
			<Button onClick={() => navigate('/checkout')}>CASSA</Button>
		</div>
	);
};

export default PanelCarrello;