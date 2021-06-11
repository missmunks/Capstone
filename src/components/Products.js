import React from 'react';
import {Link} from 'react-router-dom'
import {Product} from './';
import {deleteProduct} from '../api';


const Products = ({ token, products, cart, setCart }) => {

	const handleDelete = async (productId) => {
        const response = await fetch(`api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              console.log(response, 'rrrrrrrrrrresponse')
              const data = await response.json();
              console.log(data, 'ddddddddddddelete data')
            }
            

	return <>
		<h1>PRODUCTS!</h1>
		<div className='products-list'>
		{products.map(product => {
			const productId=product.id
			return <div key={product.id}>
				<Product token={token} product={product} products={products} cart={cart} setCart={setCart}/>
			<Link to='/AdminEditProduct />'>Edit Product</Link>
			<button onClick={() => {handleDelete(productId)}}>Delete Product</button>
			</div>
		})}
		</div>
	</>
};



export default Products;
