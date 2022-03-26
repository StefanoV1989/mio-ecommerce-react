import React, { useState } from 'react';
import { auth, getUserProfile } from '../../firebase/firebase.data';
import { Button } from '../../styled-components/button';

import './register-form.styles.scss';

const RegisterForm = () => {

	const [credenziali, setCredenziali] = useState({
		nome: '',
		cognome: '',
		email: '',
		password: ''
	});

	const { nome, cognome, email, password } = credenziali;

	const inviaDati = async event => {
		event.preventDefault();

		const newUser = await auth.createUserWithEmailAndPassword(email, password);

		getUserProfile(newUser.user, { nome, cognome });
	}

	const handleChange = event => {
		const { value, name } = event.target;

		setCredenziali({ ...credenziali, [name]: value })
	}

	return (
		<div className="register-form">
			<h2>Non sono registrato</h2>
			<span>Compila i campi seguenti</span>

			<form onSubmit={inviaDati}>
				<div className='form-group'>
					<label className="form-input-label">Nome</label>
					<input name='nome' type='text' onChange={handleChange} value={nome} required />

					<label className="form-input-label">Cognome</label>
					<input name='cognome' type='text' onChange={handleChange} value={cognome} required />

					<label className="form-input-label">Indirizzo Email</label>
					<input name='email' type='email' onChange={handleChange} value={email} required />

					<label className="form-input-label">Password</label>
					<input name='password' type='password' onChange={handleChange} value={password} required />

					<Button className='button' type='submit'>REGISTRATI</Button>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;