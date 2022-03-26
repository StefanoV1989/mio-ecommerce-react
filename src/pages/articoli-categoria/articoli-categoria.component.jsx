import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Articolo from '../../components/articolo/articolo.component';
import { selectProdottiCategoria } from '../../redux/articoli/articoli.selectors';

import './articoli-categoria.styles.scss';


const ArticoliCategoria = () => {

	const { category } = useParams();

	const prodotti = useSelector(selectProdottiCategoria(category));

	return (
		<div className="articoli-categoria">
			<h2 className='articoli-categoria'>{category}</h2>
			<div className='lista-articoli'>
				{
					prodotti.items ?
					prodotti.items.map(articolo => (
						<Articolo key={articolo.id} {...articolo} /> 
					)) : null
				}
			</div>
		</div>
	);
};

export default ArticoliCategoria;