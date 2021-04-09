require('dotenv').config()
const jwt = require('jsonwebtoken')
const {JWT_SECRET = "don't tell a soul"} = process.env
const apiRouter = require('express').Router();
const productsRouter = require('./productsRouter.js');
const usersRouter = require('./usersRouter.js');
const ordersRouter = require('./ordersRouter.js');
const orderProductsRouter = require('./orderProductsRouter.js');
const { getUserByUsername } = require('../db/users');


apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { username } = jwt.verify(token, JWT_SECRET);
      if ( username ) {
        req.user = await getUserByUsername( username );
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});


apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use("/products", productsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/orders", ordersRouter);

apiRouter.use("/order_products", orderProductsRouter);

apiRouter.get((req, res, next) => {
  res.status(404).send(error)
});

apiRouter.use((error, req, res, next) => {
  console.error(error)
  res.status(500).send(error)
});


module.exports = apiRouter;
