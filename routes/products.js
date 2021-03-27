const express = require('express');
const { getAllProducts } = require('../db/products');
const productsRouter = express.Router();
productsRouter.get('/', async(req, res, next) => {
    try {
        const allProducts = await getAllProducts()
        res.send(allProducts)
    } catch (error) {
        next(error)
    }
})
module.exports = productsRouter;