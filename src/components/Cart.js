import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Order} from './';
import { getCart } from '../api';


const Cart = ({cart, setCart, token}) => {


	
	return <Order order={cart} type={'cart'}/>
};

export default Cart;
