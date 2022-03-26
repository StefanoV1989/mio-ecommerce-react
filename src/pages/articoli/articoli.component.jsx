import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AnteprimaArticoli from '../../components/anteprima-articoli/anteprima-articoli.component';
import WithLoading from '../../components/with-loading/with-loading.component';
import ArticoliCategoria from '../articoli-categoria/articoli-categoria.component';


import './articoli.styles.scss';

import { selectIsLoading } from '../../redux/articoli/articoli.selectors';
import { useSelector } from 'react-redux';

const AnteprimaArticoliWithLoading = WithLoading(AnteprimaArticoli);
const ArticoliCategoriaWithLoading = WithLoading(ArticoliCategoria);

const Articoli = () => {

	const loading = useSelector(selectIsLoading);


	// const [prod, setProd] = useReducer(ArticoliReducer, null)

	// useEffect(() => {
	// 	const prodotti = getProdotti();

	// 	prodotti.then((dati) => {
	// 		setProd(getArticoli(dati));
	// 		setLoading(false);
	// 	})
	// }, [])

	// useEffect( () => {
	// 	console.log(prod);
	// });

	return (
		<div className="articoli">
			<Routes>
				<Route path='' element={<AnteprimaArticoliWithLoading loading={loading} />} />
				<Route path=':category' element={<ArticoliCategoriaWithLoading loading={loading} />} />
			</Routes>
		</div>
	)
};

export default Articoli;