const express = require('express');
const { getAllOrders, getOrderById, getOrdersByUser, getCartByUser } = require('../db/orders');
const { addProductToOrder, getOrderProductById, updateOrderProduct, destroyOrderProduct } = require('../db/orderProducts');
const ordersRouter = express.Router();
const {createOrder} = require('../db/index')
const { requireUser, requireAdmin } = require('./utils');

ordersRouter.get('/', requireUser, requireAdmin, async(req, res, next) => {
	try{
		const orders = await getAllOrders();
		res.send(orders);
	}
	catch(error){
		next(error);
	}
});

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
	const user = req.user;
	try{
		const cart = await getCartByUser({id: user.id})
		res.send(cart)
	}catch(error){
		next(error)
	}
});

ordersRouter.get('/:id', requireUser, async(req, res, next) => {
	const { id } = req.params;
	const user = req.user;
	try{
		const order = await getOrderById(id);
		if(order.userId === user.id || user.isAdmin){
			res.send(order);
		}
		res.send({message: 'this is not your order, silly'});
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
	try{
		const order_product = await getOrderProductById(productId);
		if(order_product){
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
