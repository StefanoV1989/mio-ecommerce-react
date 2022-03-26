import React, { useState } from 'react';
import { connect } from 'react-redux';
import { auth, getUserProfile, signInWithGoogle } from '../../firebase/firebase.data';
import { LogIn } from '../../redux/user/user.actions';
import { Button } from '../../styled-components/button';

import './login-form.styles.scss';

const LoginForm = ({setLogin}) => {

	const [credenziali, setCredenziali] = useState({ email: '', password: '' });
	const { email, password } = credenziali;

	const inviaDati = async event => {

		event.preventDefault();

		const currentUser = await auth.signInWithEmailAndPassword(email, password);

		setLogin(currentUser.user);

	}

	const loginGoogle = async () => {
		const userLogin = await signInWithGoogle()

		const { family_name, given_name } = userLogin.additionalUserInfo.profile;

		await getUserProfile(userLogin.user, { cognome: family_name, nome: given_name })

		setLogin(userLogin.user);
	}

	const handleChange = event => {
		const { value, name } = event.target;

		setCredenziali({ ...credenziali, [name]: value })
	}

	return (
		<div className="login-form">
			<h2>Hai già un account?</h2>
			<span>Utilizza email e password</span>

			<form onSubmit={inviaDati}>
				<div className='form-group'>
					<label className="form-input-label">Indirizzo Email</label>
					<input name='email' type='email' onChange={handleChange} value={email} required />

					<label className="form-input-label">Password</label>
					<input name='password' type='password' onChange={handleChange} value={password} required />


					<div className='buttons'>
						<Button data-testid='login-button' className='button' type='submit'>LOG IN</Button>
						<Button className='button' type='button' onClick={loginGoogle}>LOG IN CON GOOGLE</Button>
					</div>

				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setLogin: (user) => dispatch(LogIn(user))
})

export default connect(null, mapDispatchToProps)(LoginForm);