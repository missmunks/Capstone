import React, { useEffect} from 'react';

import { cancelOrder, completeOrder, removeFromCart } from '../api';

const Order = ({order, type, token, setCart, cart, fetchAndSetCart}) => {
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
			{order.id && token && type === 'cart' ? <button onClick = {() => {handleComplete(order.id, token)}}>Complete Order</button>  : ''}
		</div>
	</div>
};

export default Order;
