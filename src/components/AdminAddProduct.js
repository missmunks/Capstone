import React, {useState} from 'react';
// import {useState} from 'react-router-dom'
// import { createProduct } from '../db';



// NEED TO MAKE CHECKBOX TO HAVE DESCRIPTION of inStock. ALSO, THIS SHOWS VISUALLY BUT DOES NOT ADD PRODUCT!!!
const AdminAddProduct = ({token, name, setName, description, setDescription, price, setPrice, imageURL, setImageURL, inStock, setInStock, category, setCategory}) => {


    const createProduct = async () => {
        const response = await fetch(`api/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
             body: JSON.stringify({
                    name:name,
                    description: description,
                    price: price,
                    "imageURL": imageURL,
                    "inStock" : inStock,
                    category: category
             })
        })
        const data = await response.json()
        console.log(data, 'tjhis iss thje add product data')
        setName('')
        setDescription('')
        setPrice('')
        setImageURL('')
        setInStock('')
        setCategory('')
    }




    const handleSubmit = (event) => {
        event.preventDefault();
        createProduct();
    }

    return <>
        <div className='newProduct'>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit} className='addProduct'>
                <input type="text" className='nameInput' value={name} onChange={(event) => {setName(event.target.value)}} placeholder='Product Name'></input>
                <input type="text" className='descriptionInput' value={description} onChange={(event) => {setDescription(event.target.value)}} placeholder='Product Description'></input>
                <input type="text" className='priceInput' value={price} onChange={(event) => {setPrice(event.target.value)}} placeholder='Product Price'></input>
                <input type="text" className='categoryInput' value={category} onChange={(event) => {setCategory(event.target.value)}} placeholder='Product Category'></input>
                <input type="image" className='imageInput' value={imageURL} onChange={(event) => {setImageURL(event.target.value)}} placeholder='Product Image'></input>
                <input type="checkbox" className='inStockInput' value={inStock} onChange={(event) => {setInStock(event.target.value)}} placeholder='Product In Stock? '></input>
                <button>Add Product</button>
            </form>

        </div>
    </>

}

    export default AdminAddProduct;