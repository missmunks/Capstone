import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {getOrdersByUser} from '../api';
import {Order} from './';

const Orders = ({orders, setOrders, token, user}) => {
	const userId = user.id;
	const fetchAndSetOrders = async (user, token) => {
		try{
			const queriedOrders = await getOrdersByUser(user, token);
			setOrders(queriedOrders);
		}
		catch(error){
			console.log(error);
		}
	};
	
	useEffect(()=>{
		fetchAndSetOrders(user, token);
	} , [user]);
	
	return <>
		<div className='orders-list'>
			<h2>Your Previous Orders</h2>
			{orders.map(order => {
				return <div key={order.id}>
					<Order order={order} />
				</div>
			})}
		</div>
	</>
};

export default Orders;
