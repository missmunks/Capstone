const express = require('express');
const { addProductToOrder, getOrderProductById, updateOrderProduct, destroyOrderProduct } = require('../db/orderProducts');
const orderProductsRouter = express.Router();

//needs to update quantity or price of order_product
orderProductsRouter.patch('/:orderProductId', async(req, res, next) => {
    const {price, quantity} = req.body;
    const {orderProductId} = req.params;
    console.log('updating order_product');
    try{
        const order_product = await updateOrderProduct({id: orderProductId, price: price, quantity: quantity});
        res.send(order_product);
    }catch(error){
        next(error);
    }
});

//needs to remove product from order
orderProductsRouter.delete('/:orderProductId', async(req, res, next) => {
    try{
        const {orderProductId} = req.params;
        const order_product = await destroyOrderProduct(orderProductId);
        console.log('deleting order_product');
        res.send({message: 'deleted', order_product});
    }catch(error){
        next(error);
    }
});

module.exports = orderProductsRouter;
