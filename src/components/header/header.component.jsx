import React from 'react';

import { ReactComponent as Logo } from '../../logo.svg';


import './header.styles.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.data';
import { connect } from 'react-redux';
import { LogOut } from '../../redux/user/user.actions';

import PanelCarrello from '../panel-carrello/panel-carrello.component';
import CarrelloIcona from '../carrello-icona/carrello-icona.component';

const Header = ({ user, hiddenCart, setLogout, toggleCart }) => {

	const logout = () => {
		auth.signOut();

		setLogout();
	}

	return (
		<div className='header'>
			<Link className='logo-container' to='/'>
				<Logo className='logo' />
			</Link>
			<div className='options'>
				<Link className='option' to='/shop'>ARTICOLI</Link>
				{
					user !== null ? (
						<div className='option' onClick={logout}>LOGOUT</div>
					) : (
						<Link className='option' to='/login'>LOGIN</Link>
					)
				}

				<CarrelloIcona />

			</div>
			{
				hiddenCart ? null : (
					<PanelCarrello />
				)
			}
		</div>
	)
};

const mapStateToProps = (state) => ({
	user: state.user.loggedUser,
	hiddenCart: state.cart.hidden
});

const mapDispatchToProps = (dispatch) => ({
	setLogout: () => dispatch(LogOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);