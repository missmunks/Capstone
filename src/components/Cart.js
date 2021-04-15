import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Order} from './';
import { getCart } from '../api';


const Cart = ({fetchAndSetCart, cart, setCart, token}) => {

	useEffect(()=> {
		fetchAndSetCart(token);
	},[])

	
	return <Order order={cart} type={'cart'}/>
};

export default Cart;
