import React, {useState} from 'react';
import {Product} from './'

const AdminEditProduct = ({
    token,
    id,
    singleProduct,
    product,
    products, 
    setProducts, 
    name, 
    setName, 
    description, 
    setDescription, 
    price, 
    setPrice, 
    imageURL, 
    setImageURL, 
    category, 
    setCategory,  
    inStock, 
    setInStock}) => {

     console.log(singleProduct, 'this is the single product that is passed in from the app fffffffffffffffffffffffffffffffffffffffffffffffffff')
        console.log(product, '++++++++++++++++++++++++++++++++')
    const [productId, setProductId] = useState('')
     console.log(productId, '2222222222222222')
            const handleSubmit = async (ev) => {
            ev.preventDefault();
            const response = await fetch(`api/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'Application/json',
                "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify({
                name,
                description,
                price,
                imageURL,
                category,
                inStock
              })
            });
            console.log(response, 'rrrrrrrrrrrreeeeeeesponse data Admin edit product')
            const data = await response.json();
            console.log(data, 'eddddddddddiiiiiiiiiiiitttttttttttttt   data')
                setName("");
                setDescription('')
                setPrice('')
                setImageURL('')
                setCategory('')
                setInStock('')
                const edited = alert("You have edited a product.")
            }
            
       console.log(id, '44444444444444444')
       console.log(product, '5555555555555555')
    
    
        return (
            <>

            <form onSubmit={handleSubmit}>
            <input type="text" className='nameInput' value={name} onChange={(event) => {setName(event.target.value)}} placeholder='Product Name'></input>
                <input type="text" className='descriptionInput' value={description} onChange={(event) => {setDescription(event.target.value)}} placeholder='Product Description'></input>
                <input type="text" className='priceInput' value={price} onChange={(event) => {setPrice(event.target.value)}} placeholder='Product Price'></input>
                <input type="text" className='categoryInput' value={category} onChange={(event) => {setCategory(event.target.value)}} placeholder='Product Category'></input>
                <input type="image" className='imageInput' value={imageURL} onChange={(event) => {setImageURL(event.target.value)}} placeholder='Product Image'></input>
                <input type="checkbox" className='inStockInput' value={inStock} onChange={(event) => {setInStock(event.target.value)}} placeholder='Product In Stock? '></input>
                {/* <button>Add Product</button> */}
              <button type='submit' onClick={handleSubmit}>Edit</button>
            </form>
            </>
            ) 
        }

export default AdminEditProduct;