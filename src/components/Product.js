import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getProductById } from '../api/index.js';

const Product = ({products, product}) => {
	const {id} = useParams();
	const [singleProduct, setSingleProduct ] = useState({});

	const getProduct = async (id) => {
		try{
			const theProduct = await getProductById(id);
			return theProduct;
		}catch(error){
			throw error;
		}
	}

	useEffect(async () => {
		const aProduct =await getProduct(id)
		if(aProduct){
	   setSingleProduct(aProduct)
		}
	}, [id])

	if(product){
		return <div key={product.id}>
		<h3 className='products-list-name'>{product.name}</h3>
		<ul>
			<li>description: {product.description}</li>
			<li>in stock? {product.inStock ? 'yes' : 'no' }</li>
			<li>price: ${product.price}</li>
		</ul>
	</div>
	}else{


	return <div key={id}>
				<h3 className='products-list-name'>{singleProduct.name}</h3>
				<ul>
					<li>description: {singleProduct.description}</li>
					<li>in stock? {singleProduct.inStock ? 'yes' : 'no' }</li>
					<li>price: ${singleProduct.price}</li>
				</ul>
			</div>
	}
};

export default Product;
