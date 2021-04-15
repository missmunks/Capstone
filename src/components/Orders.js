import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {getOrdersByUser} from '../api';
import {Order} from './';

const Orders = ({orders, setOrders, token, user, setCart}) => {
	console.log('orders from orders, ', orders);
	const userId = user.id;
	const fetchAndSetOrders = async (user, token) => {
		try{
			const queriedOrders = await getOrdersByUser(user, token);
			console.log(queriedOrders);
			setOrders(queriedOrders);
		}
		catch(error){
			console.log(error);
		}
	};
	console.log(orders, '111111111111111111111111111111')
	useEffect(()=>{
		fetchAndSetOrders(user, token);
	} , [user]);
	
	return <>
		<div className='orders-list'>
			<h2>Your Previous Orders</h2>
			{orders.map(order => {
				console.log(order, '999999999999999999999999999999999999999999999999999999999999999999999')
				return <div key={order.id}>
					<Order order={order} setCart = {setCart}/>
				</div>
			})}
		</div>
	</>
};

export default Orders;