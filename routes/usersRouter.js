require('dotenv').config()
const jwt = require('jsonwebtoken')
const {JWT_SECRET = "don't tell a soul"} = process.env
const express = require('express');
const usersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');

const {
  getUserByUsername,
  getUser,
  getAllUsers,
  getUserById,
} = require('../db/users');

const {
	createUser,
} = require('../db/index');
const { response } = require('express');
const { getOrdersByUser} = require('../db/orders')


usersRouter.get('/', requireUser, requireAdmin, async (req, res, next) => {
	const users = await getAllUsers();
	res.send(users);
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
  const {user} = req;
    try{
      res.send(user);
    }catch(err){
      throw(err);
    }
});


usersRouter.post('/register', async (req, res, next) => {
    const {username, password} = req.body;
    try {
      const checkUser = await getUserByUsername(username);
      if (checkUser) {
          throw new Error ('A user by that username already exists.')
      }
      if (password.length < 8) {
          throw new Error ('Passwords must be at least 8 characters long')
      }

      const user = await createUser(req.body)

      const token = jwt.sign({
		    id: user.id,
		    username : user.username
      }, JWT_SECRET, {
        expiresIn: '1w'
      });
      res.send({
        user,
        token,
        message: 'Registered successfully'
      });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/login', async(req, res, next) => {
    const { username, password } = req.body
    if (!username || ! password){
        throw new Error ('Both username and password are required')
    }
    try {
        const user = await getUser({username, password});
        if (user) {
          const token = jwt.sign({
            id: user.id,
            username: user.username
          }, JWT_SECRET,)
          res.send({ 
            message: "you're logged in!", 
            user,
            token: token
            
          });
        } else {
            throw new Error ('Username or password is incorrect')
        }
        console.log(token)
    } catch (error) {
        next(error)
    }
});

usersRouter.get('/:userId/orders', requireUser, async(req,res,next) =>{
  try {
    const { userId } = req.params;
    if(req.user.id === userId*1) {
      const orders = await getOrdersByUser({id: userId});
      res.send(orders);
    }
    else{
    	res.send({message: 'not your order'});
    }
  } catch (error) {
    next(error)
  }
});





module.exports = usersRouter;
