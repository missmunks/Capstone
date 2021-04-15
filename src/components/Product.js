import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import { getProductById, createOrder, addToCart } from '../api/index.js';

const Product = ({ product, cart, setCart, token}) => {
	const {id} = useParams();
	const [singleProduct, setSingleProduct ] = useState(product ? product : {});

	const getProduct = async (id) => {
		try{
			const theProduct = await getProductById(id);
			return theProduct;
		}catch(error){
			throw error;
		}
	}

	useEffect( () => {
		const getAndSetProduct = async () => {
			const aProduct = await getProduct(id)
			if(aProduct){
			 setSingleProduct(aProduct)
			}
		}
		if(id){
			getAndSetProduct();
		}
	}, [id])

	const handleAddToCart = async () => {
		try{
			if (cart.id){
				console.log('THERE IS A CART IN STATE, the current product and cart need to be passed into addToCart()');
				//call addOrderToCart route
				addToCart(cart.id, singleProduct, token);
			}
			else {
				console.log('THERE IS NO CART IN STATE, the current product and cart need to be passed into addToCart()');
				//create an order with the status "created" and then call addOrderToCart
				const newCart = await createOrder(token);
				console.log('the new cart', newCart);
				addToCart(newCart.id, singleProduct, token);
			}
		}
		catch(error){
			throw error;
		}
	}

	// update the price in the cart!

	if(product){
		return <>
			<h3 className='products-list-name'>
				<Link to={`/products/${product.id}`}> {product.name} </Link>
			</h3>
			<ul>
				<li>description: {product.description}</li>
				<li>in stock? {product.inStock ? 'yes' : 'no' }</li>
				<li>price: ${product.price}</li>
				<button onClick={handleAddToCart}>Add to Cart</button>
			</ul>
		</>
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
