import React from 'react';

import { useNavigate } from 'react-router-dom';
import './categoria.styles.scss';

const Categoria = ({ image, title, url }) => {

	const navigate = useNavigate();

	return (
		<div className="categoria" data-testid={title} onClick={() => navigate(url)}>
			<div className='bg-image' style={{ backgroundImage: `url(${image})` }}></div>
			<div className="content">
				<h1 className="title">{title.toUpperCase()}</h1>
				<span className="subtitle">VISITA ORA</span>
			</div>
		</div>
	);
};

export default Categoria;