import React from 'react';
import {Order} from './';



const Cart = ({cart, setCart, token, fetchAndSetCart}) => {
	return <Order order={cart} type={'cart'} fetchAndSetCart={fetchAndSetCart} token={token} setCart={setCart}/>
};

export default Cart;
