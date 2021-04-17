import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {getMe} from '../api/index.js';
import {Orders} from './';

const MyAccount = ({user, token, orders, setOrders}) => {
	const [myData, setMyData] = useState({});
	const getCurrentUser = async (token) => {
		try{
			const theUser = await getMe(token);
			return theUser;
		}
		catch(error){
			throw error;
		}
	};

	
	useEffect( () => {
		const getAndSetTheUser = async () => {
			const userToSet = await getCurrentUser(token)
			if (userToSet){
				setMyData(userToSet);
			}
		};
		getAndSetTheUser();
	}, []);

	return <>
		{token ? <h3>{user.username}'s account page</h3> : ""}
		<h1>Profile Information: </h1>
		<h3><img src={user.imageURL} width="200px" /></h3>
		<h3>Username: {user.username}</h3>
		<h3> Name: {user.firstName + user.lastName}</h3>
		<h3>email: {user.email}</h3>
		<div><Orders orders={orders} setOrders={setOrders} token={token} user={user} /></div>
	</>
}

export default MyAccount;
