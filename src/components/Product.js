import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Product = ({product}) => {
	return <div key={product.id}>
				<h3 className='products-list-name'>{product.name}</h3>
				<ul>
					<li>description: {product.description}</li>
					<li>in stock? {product.inStock ? 'yes' : 'no' }</li>
					<li>price: ${product.price}</li>
				</ul>
			</div>
};

export default Product;