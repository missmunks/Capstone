import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { register } from '../api/index.js';

const Register = ({setUser, setToken}) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [imageURL, setImageURL] = useState('');
	const history = useHistory();
	
	const handleSubmit = async (ev) => {
		
	
		ev.preventDefault();
		try{
			const userData = await register({	
				firstName,
				lastName,
				email,
				username,
				password,
				imageURL
  		});
			localStorage.setItem('token', userData.token);
			localStorage.setItem('user', userData.user);
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
				<input type='text' value={firstName} onChange={(ev) => setFirstName(ev.target.value)} placeholder="firstName"></input>
				<br />
				<input type='text' value={lastName} onChange={(ev) => setLastName(ev.target.value)} placeholder="lastName"></input>
				<br />
				<input type='text' value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="email"></input>
				<br />
				<input type='text' value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="username"></input>
				<br />
				<input type='password' value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="password"></input>
				<br />
				<input type='text' value={imageURL} onChange={(ev) => setImageURL(ev.target.value)} placeholder="image url"></input>
				<br />
				<button type="submit">Login</button>
			</form>
			<Link to='/login'>have an account? login here!</Link>
		</div>
</>
};


export default Register;
