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
			localStorage.setItem('token', userData.token);
			localStorage.setItem('user', JSON.stringify(userData.user));
			setToken(userData.token);
			setUser(userData.user);
			setUsername('');
			setPassword('');
			history.push('/');
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
					<button type="submit">Login</button>
				</form>
				<Link to='/register'>need an account? register here!</Link>
			</div>
	</>
};


export default Login;
