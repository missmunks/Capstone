import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getOrderById, cancelOrder, completeOrder } from '../api';

const Order = ({order, type, token, setCart, cart}) => {
	console.log(token)
	console.log(order, 'this is the order passed into order')

	if (!order){
		return <div>NO ORDER</div>
	}

	console.log(order.id, "##################################")
    const handleCancel = async (orderId, token) => {
		console.log(order, 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
        console.log("I am starting to delete the order")
    		if(!order) {
        	return alert("There is no order to delete")
    			}else{
    				try{
						console.log(token, 'token from hancleCancel 2')
       					 await cancelOrder(orderId, token)
					 	 setCart('')
    				}catch(error){
        			throw error;
   				    }
    			}
	}


		const handleComplete = async(orderId, token) => {
			console.log('I am starting to handle the complete order')
			if(!orderId) {
				return alert("there is no order to complete")
			}else {
				try{
					console.log(token, '888888888888888888888888888888')
					console.log(order.id, 'ppppppppppppppppppppppppppppppp')
					await completeOrder(order.id, token)
					setCart('')
			}catch(error) {
				throw error;
			}
		} 
	}


	return <div>
	
		<div className='single-order'>
			<h3>Order id: {order.id}</h3>
			<h3>Date Placed: {order.datePlaced}</h3>
			<h3>Status: {order.status}</h3>
			<h3>Products:</h3>
			{token && type === 'cart' ? <button onClick = {() => {handleCancel(Number(order.id), token)}}>Cancel Order</button> : ''}
			{token && type === 'cart' ? <button onClick = {() => {handleComplete(order.id, token)}}>Complete Order</button>  : ''}
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