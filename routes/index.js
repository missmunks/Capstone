const apiRouter = require('express').Router();
const productsRouter = require('./productsRouter.js');
const usersRouter = require('./usersRouter.js');
const ordersRouter = require('./ordersRouter.js');

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use("/products", productsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/orders", ordersRouter);

module.exports = apiRouter;
