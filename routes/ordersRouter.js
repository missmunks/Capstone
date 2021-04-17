const express = require('express');
const { 
	getAllOrders, 
	getOrderById, 
	getOrdersByUser, 
	getCartByUser, 
	updateOrder, 
	completeOrder,
	cancelOrder 
} = require('../db/orders');
const { 
	addProductToOrder, 
	getOrderProductById, 
	updateOrderProduct, 
	destroyOrderProduct 
} = require('../db/orderProducts');
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
ordersRouter.post('/:orderId/products', requireUser, async(req, res, next) => {
	const { orderId } = req.params;
  const {productId, price, quantity} = req.body;
  const user = req.user;
	try{
		const order = await getOrderById(orderId*1);
		if(order.userId === user.id){
			const addedProduct = await addProductToOrder({orderId, productId, price, quantity});
			res.send(addedProduct);
		}
		else{
			res.send({message:'either thats not your order to add products to, or we goofed'});
		}
	}
	catch(error){
		next(error);
	}
});
//TESTED WORKING
ordersRouter.patch('/:orderId', requireUser, async(req, res, next) => {
	const { orderId } = req.params;
	const { status, userId } = req.body;
	const user = req.user;
	
	try{
		const order = await getOrderById(orderId*1);
		if(order.userId === user.id && status === 'completed'){
			const completedOrder = await updateOrder({id: orderId, status, userId});
			res.send(completedOrder);
		}
		else if(order.userId === user.id){
			const updatedOrder = await updateOrder({id: orderId, status, userId});
			res.send(updatedOrder);
		}
		else{
			res.send({message:'either thats not your order to add products to, or we goofed'});
		}
	}
	catch(error){
		next(error)
	}
});
//TESTED WORKING
ordersRouter.delete('/:orderId', requireUser, async(req, res, next) => {
	const { orderId } = req.params;
	const user = req.user;
	
	try{
		const order = await getOrderById(orderId*1);
		if(order.userId === user.id){
			const cancelledOrder = await cancelOrder(orderId);
			res.send(cancelledOrder);
		}
		else{
			res.send({message:'either thats not your order to add products to, or we goofed'});
		}
	}
	catch(error){
		next(error)
	}
});



module.exports = ordersRouter;
