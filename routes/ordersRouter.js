const express = require('express');
const { getAllOrders, getOrderById, getOrdersByUser } = require('../db/orders');
const { addProductToOrder, getOrderProductById, updateOrderProduct, destroyOrderProduct } = require('../db/orderProducts');
const ordersRouter = express.Router();
const {createOrder} = require('../db/index')
const { requireUser } = require('./utils');

ordersRouter.get('/', async(req, res, next) => {
	try{
		const orders = await getAllOrders();
		res.send(orders);
	}
	catch(error){
		next(error);
	}
});

ordersRouter.get('/:id', async(req, res, next) => {
	const { id } = req.params;
	try{
		const order = await getOrderById(id);
		res.send(order);
	}
	catch(error){
		next(error);
	}
});

ordersRouter.post('/', requireUser, async(req, res, next) => {
    const { id } = req.user;
    const userId = id;
    const orderData = {};
    try {
        orderData.userId = userId
        orderData.status = 'created';
        const newOrder = await createOrder(orderData)
        if (newOrder){    
        res.send(newOrder)
        } 
    } catch (error) {
        next(error)
    }

})

//needs to add order_product to order
ordersRouter.post('/:orderId/products', async(req, res, next) => {
	const { orderId } = req.params;
    const {productId, price, quantity} = req.body;
	console.log('adding order_product');
	try{
		const order_product = await getOrderProductById(productId);
		if(order_product){
            console.log('order_product retrieved', order_product);
            const updated = await updateOrderProduct({id: order_product.id, quantity: quantity});
		    res.send({updated, message: 'updated'});
        }else{
            const newOrderProduct = await addProductToOrder({orderId, productId, price, quantity});
            res.send({newOrderProduct, message: 'new order_product'});
        }
	}
	catch(error){
		next(error);
	}
});

module.exports = ordersRouter;
