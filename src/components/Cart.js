import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Order} from './';
import { getCart } from '../api';


const Cart = ({cart, setCart, token, fetchAndSetCart}) => {
	return <Order order={cart} type={'cart'} fetchAndSetCart={fetchAndSetCart} token={token}/>
};

export default Cart;
