const express = require('express');
const { createProduct } = require('../db');
const { getAllProducts, getProductById, destroyProduct, updateProduct} = require('../db/products');
const {getOrdersByProduct} = require('../db/orders')
const ordersRouter = require('./ordersRouter');
const productsRouter = express.Router();
const {requireUser, requireAdmin } = require('./utils')


productsRouter.get('/', async(req, res, next) => {
    try {
        const allProducts = await getAllProducts()
        res.send(allProducts)
    } catch (error) {
        next(error)
    }
});

productsRouter.get('/:id', async(req, res, next) => {
	const { id } = req.params;
	console.log('going to get a specific product');
	try{
		const product = await getProductById({id});
		res.send(product);
	}
	catch(error){
		next(error)
	}
});

productsRouter.post('/', requireAdmin, async(req, res, next) => {
    const {
        name,
        description, 
        price, 
        imageUrl, 
        inStock, 
        category
    }= req.body;
    const {id} = req.user
    const productData = {};

    try{
        productData.name = name
        productData.description = description;
        productData.price = price;
        productData.imageUrl = imageUrl;
        productData.inStock = inStock;
        productData.category = category;
        const newProduct = await createProduct(productData)
        if(newProduct) {
            res.send(newProduct)
        }else{
            res.status(500).send({message: 'there was an error creating product'})
        }
    }catch(error) {
        next(error)
    }
})

productsRouter.delete('/:productId', requireAdmin, async(req,res,next) => {
    const {productId} = req.params;
    try{
        const deletedProduct = await destroyProduct(productId)
        if(deletedProduct) {
            res.send(deletedProduct)
        }else {
            res.status(500).send({message: 'there was an error deleting the product'})
        }
    }catch(error) {
            next(error)
        }
    

})



productsRouter.patch('/:productId', requireAdmin, async(req, res, next) => {
    const { productId } = req.params;
    const {  
        name,
        description, 
        price, 
        imageUrl, 
        inStock, 
        category } = req.body;
    const { id } = req.user;
    const updateFields = {};
 
    if (name) {
        updateFields.name = name
    }
    if (description) {
        updateFields.description = description
    }
    if(price) {
        updateFields.price = price
    }
    if (imageUrl) {
        updateFields.imageUrl = imageUrl
    }
    if(inStock) {
        updateFields.inStock = inStock
    }
    if(category) {
        updateFields.category = category
    }
    try {
        const updatedProduct = await updateProduct({id: Number(productId), ...(updateFields)})
        res.send(updatedRoutine)
        
    } catch (error) {
        next(error)
    }
});

productsRouter.get('/:productId/orders', requireAdmin, async (req, res, next) => {
    const {orderId} = req.params;

    try {
        const products = await getOrdersByProduct(orderId);

        res.send(products);
    } catch (error) {
        next(error);
    }
})



module.exports = productsRouter;
