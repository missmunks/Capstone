const express = require('express');
const { addProductToOrder, getOrderProductById, updateOrderProduct, destroyOrderProduct } = require('../db/orderProducts');
const orderProductsRouter = express.Router();

//needs to add order_product to order
orderProductsRouter.post('/orders/:orderId/products', async(req, res, next) => {
	const { id } = req.params;
	console.log('going to get a specific order product');
	try{
		const order_product = await getOrderProductById({id});
		console.log('order_product retrieved', order_product);
		res.send(order_product);
	}
	catch(error){
		next(error);
	}
});

//needs to update quantity or price of order_product
orderProductsRouter.patch('/order_products/:orderProductId', async(req, res, next) => {
    const {id, price, quantity} = req.params;
    console.log('updating order_product');
    try{
        const order_product = await updateOrderProduct(id, price, quantity);
        res.send(order_product);
    }catch(error){
        next(error);
    }
});

//needs to remove product from order
orderProductsRouter.delete('/order_products/:orderProductId', async(req, res, next) => {
    try{
        const {id} = req.params;
        const order_product = await destroyOrderProduct(id);
        console.log('deleting order_product');
    }catch(error){
        next(error);
    }
});

module.exports = orderProductsRouter;
