import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Product} from './';


const Products = ({ products, }) => {
	return <>
		<h1>PRODUCTS!</h1>
		<div className='products-list'>
		{products.map(product => {
			return <Product product={product}/>
		})}
		</div>
	</>
};



export default Products;



