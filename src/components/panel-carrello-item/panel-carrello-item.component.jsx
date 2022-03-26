import React from 'react';

import './panel-carrello-item.styles.scss';

const PanelCarrelloItem = ({imageUrl, quantita, name, price}) => {
	return (
		<div className="panel-carrello-item">
			<img src={imageUrl} alt='item' />
			<div className='dettagli'>
				<span className='name'>{name}</span>
				<span className='price'>{quantita} x {price}€</span>
			</div>
		</div>
	);
};

export default PanelCarrelloItem;