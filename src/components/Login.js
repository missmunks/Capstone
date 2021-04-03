import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { login } from '../api/index.js';

const Login = ({setUser, setToken}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();


	const handleSubmit = async (ev) => {
		ev.preventDefault();

		try{
			const userData = await login({username, password});
			console.log('LOGIN DATA:', userData);
			localStorage.setItem('token', userData.token);
			localStorage.setItem('user', userData.user);
			setToken(userData.token);
			setUser(userData.user);

		}
		catch(error){
			throw error;
		}

	};

	return <>
			<div className='accountform'>
				<form onSubmit={handleSubmit}>
					<input type='text' value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="username"></input>
					<br />
					<input type='password' value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="password"></input>
					<br />
					<button type="submit">SUBMIT</button>
				</form>
			</div>
	</>
};


export default Login;
