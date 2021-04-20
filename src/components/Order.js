import React, { useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { cancelOrder, completeOrder, removeFromCart } from '../api';
import axios from 'axios';


const Order = ({order, type, token, setCart, cart, fetchAndSetCart}) => {
	const stripePromise = loadStripe('pk_test_51IgfNNBiothv58cfwCUp7ZPgIF2yCI2MoUcLpb6koAO7fWyCOX5yrS1fglu9iEOJh2n3pCnHy2W0cZNk8cqpo4jh00jPyg0vgy');
	const resetCartObj = {products: []};
  	const handleCancel = async (orderId, token) => {
		if(!order) {
    	return alert("There is no order to delete")
		}
		else{
			try{
				 await cancelOrder(orderId, token)
			 	 setCart(resetCartObj)
			}catch(error){
  			throw error;
	    }
		}
	}
	const handleComplete = async(orderId, token) => {
		if(!orderId) {
			return alert("there is no order to complete")
		}
		else{
			try{
				await completeOrder(order.id, token)
				alert("send check or money order to 866 Wallaby Way, Sydney")
				setCart(resetCartObj)
			}catch(error){
				throw error;
			}
		} 
	}
    
	const handleProductRemove = async (id) => {
		await removeFromCart(id);
		await fetchAndSetCart(token);
	};
	
	const handleStripeClick = async (ev) => {
		try{
			const stripe = await stripePromise;
			console.log(stripe, 'stripe');
			const {data: session} = await axios.post('/api/stripe/create-checkout-session');
			console.log('session', session)
			const result = await stripe.redirectToCheckout({
				sessionId: session.id,
			});
			
			if (result.error) {
				throw result.error;
			}
		}
		catch(error){
			throw error;
		}
	};
	
	useEffect(()=>{
		if(type==='cart'){fetchAndSetCart(token);}
	} , []);
	
	return <div>
	
		<div className='single-order'>
      {!order.id ? <h1>YOUR CART IS EMPTY</h1> : ""}
      {order.id  ?<h3>Order id: {order.id}</h3> : ""}
      {order.id  ?<h3>Date Placed: {(order.datePlaced).slice(0, 10)}</h3> : "" }
      {order.id  ?<h3>Status: {order.status}</h3> : "" }
      {order.id  ?	<h3>Products:</h3> : "" }
      <ul>
        {order.products.map(product => {
          return <div className='order-product' key={product.id}>
            <h4>Product Name: {product.name}</h4>
            <h3>Price: {product.price}</h3>
            <h3>Quantity: {product.quantity}</h3>
            {type === 'cart' ? <button className="productRemove" onClick = {() => {handleProductRemove(product.id)}}>Remove</button> : ''}
          </div>
        })}
      </ul>
			{order.id && token && type === 'cart' ? <button onClick = {() => {handleCancel(Number(order.id), token)}}>Cancel Order</button> : ''}
			{order.id && token && type === 'cart' ? <button onClick = {() => {handleComplete(order.id, token)}}>Cash, check, or money order</button>  : ''}
			{order.id && token && type === 'cart' ? <button role="link" onClick={handleStripeClick}>Checkout with Stripe</button>  : ''}
		</div>
	</div>
};

export default Order;
