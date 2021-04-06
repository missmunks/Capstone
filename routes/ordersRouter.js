const express = require('express');
const { getAllOrders, getOrderById, getOrdersByUser } = require('../db/orders');
const ordersRouter = express.Router();

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


module.exports = ordersRouter;
