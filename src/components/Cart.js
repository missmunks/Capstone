import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Order} from './';
import { getCart } from '../api';


const Cart = ({cart, setCart, token}) => {

console.log(token, 'this is the token from cart')
	
	return <Order order={cart} type={'cart'} token= {token} setCart = {setCart}/>
};

export default Cart;
