import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Order} from './';
import { getCart } from '../api';


//needs to call GET /orders/cart with a token in the header, and render an Order component with the returned "order"
const Cart = ({cart, setCart, token}) => {
	const fetchAndSetCart = async (token) => {
		try{
			const queriedCart = await getCart(token);
			setCart(queriedCart);
		}
		catch(error){
			console.log(error);
		}
	};
	
	useEffect(()=>{
		// fetchAndSetCart(token);
	} , [token]);
	
	return <Order order={cart} type={'cart'}/>
};

export default Cart;
