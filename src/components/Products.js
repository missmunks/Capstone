import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Product} from './';


const Products = ({ products }) => {
	return <>
		<h1>PRODUCTS!</h1>
		<div className='products-list'>
		{products.map(product => {
			return <div key={product.id}>
				<Product product={product} products={products} />
			</div>
		})}
		</div>
	</>
};



export default Products;
