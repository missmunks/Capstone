import React from 'react';
import {Link} from 'react-router-dom'
import {Product} from './';
import {deleteProduct} from '../api';


const Products = ({ token, products, cart, setCart, singleProduct, setSingleProduct }) => {
	console.log(singleProduct, 'this is the single product in the multiple products component ****************')
	console.log(products, 'this is the product from the multiple products component ////////////////////')

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
				<Link to='/AdminEditProduct'>
					<button type="button">Edit Product</button>
				</Link>
			<button onClick={() => {handleDelete(productId)}}>Delete Product</button>
			</div>
		})}
		</div>
	</>
};



export default Products;
