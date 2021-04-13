import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getOrderById } from '../api';

const Order = ({order}) => {

	if (!order){
		return <div>NO ORDER</div>
	}
	return <div>
	
		<div className='single-order'>
			<h3>Order id: {order.id}</h3>
			<h3>Date Placed: {order.datePlaced}</h3>
			<h3>Status: {order.status}</h3>
			<h3>Products:</h3>
			<ul>
				{order.products && order.products.map(product => {
					return <div className='order-product' key={product.id}>
						<h4>Product ID: {product.id}</h4>
						<h4>Price: {product.price}</h4>
						<h4>Quantity: {product.quantity}</h4>
					</div>
				})}
			</ul>
		</div>
	
	</div>
};

export default Order;