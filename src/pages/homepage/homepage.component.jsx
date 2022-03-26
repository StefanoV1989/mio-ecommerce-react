import React from 'react';
import { useSelector } from 'react-redux';

import Categoria from '../../components/categoria/categoria.component';
import { selectProdotti } from '../../redux/articoli/articoli.selectors';

import './homepage.styles.scss';


const Homepage = () => {

	const categorie = useSelector(selectProdotti);

	return (
		<div className="homepage">
			{
				categorie.sort((a, b) => {
					return a.id < b.id ? -1 : 1
				}).map(cat => (
					<Categoria key={cat.id} {...cat} />
				))
			}
		</div>
	)
};

export default Homepage;