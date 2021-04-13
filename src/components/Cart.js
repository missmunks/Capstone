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

	// when is it the correct time to set the cart?
	// what state variables are neccessary?
	
	return <Order order={cart} type={'cart'}/>
};

export default Cart;


	// local storage: cart is an object
	// how do you store an object within local storage?
	// useEffect-- how do you know if you should use cart in local storage or in the database (ie: useEffect on line 19)
	// const [token, setToken] = useState( () => {
		// if (localStorage.getItem('token')) {
		// 	return localStorage.getItem('token')
		// } else {
		// 	return ''
		// }
