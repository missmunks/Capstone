import React from 'react';
import {Orders} from './';

const MyAccount = ({user, token, orders, setOrders}) => {


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
