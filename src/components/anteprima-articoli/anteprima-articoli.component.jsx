import React from 'react';
import { useSelector } from 'react-redux';
import { selectProdotti } from '../../redux/articoli/articoli.selectors';
import Articolo from '../articolo/articolo.component';

import './anteprima-articoli.styles.scss';

const AnteprimaArticoli = () => {
	
	const prodotti = useSelector(selectProdotti);
	
	return (
		<div className="anteprima-articoli">
			{
				prodotti.map((val) => {
					return (
						<div key={val.id} className='articoli-preview'>
							<h2 className='articoli-categoria'>{val.title}</h2>
							<div className='lista-articoli'>
								{
									
									val.items.filter((valore, indice) => indice < 5).map((articolo => {
										return (
										<Articolo key={articolo.id} {...articolo} />
										)
									}))
								}
							</div>
						</div>
					)
				})
			}
		</div>
	);
};

export default AnteprimaArticoli;