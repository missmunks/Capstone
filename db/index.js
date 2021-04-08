// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'grace-shopper-db'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

// database methods
async function dropTables() {
  try{
  await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
  `);
  }
  catch(err){
  	throw err
  }
};

async function buildTables() {
  try{
		await client.query(`
		  CREATE TABLE products(
		    id SERIAL PRIMARY KEY,
		    name VARCHAR(255) NOT NULL,
		    description VARCHAR(255) NOT NULL,
		    price INTEGER NOT NULL,
		    "imageURL" VARCHAR(255) DEFAULT './placeholder.jpg',
		    "inStock" BOOLEAN DEFAULT false,
		    category VARCHAR(255) NOT NULL
		  );
		`);
		await client.query(`
		    CREATE TABLE users(
		      id SERIAL PRIMARY KEY,
		      "firstName" VARCHAR(255) NOT NULL,
		      "lastName" VARCHAR(255) NOT NULL,
		      email VARCHAR(255) UNIQUE NOT NULL,
		      "imageURL" VARCHAR(255) NOT NULL,
		      username VARCHAR(255) UNIQUE NOT NULL,
		      password VARCHAR(255) UNIQUE NOT NULL,
		      "isAdmin" BOOLEAN DEFAULT false
		    )
		`);
	await client.query(`
			CREATE TABLE orders(
				id SERIAL PRIMARY KEY,
				status VARCHAR(255) DEFAULT 'created',
				"userId" INTEGER REFERENCES users(id),
				"datePlaced" DATE NOT NULL DEFAULT CURRENT_DATE
			)
	`);
	await client.query(`
			CREATE TABLE order_products(
				id SERIAL PRIMARY KEY,
				"productId" INTEGER REFERENCES products(id),
				"orderId" INTEGER REFERENCES orders(id),
				price INTEGER NOT NULL,
				quantity INTEGER NOT NULL DEFAULT 0
			)
	`);
	}
	catch(err){
		throw err;
	}
};

const createProduct = async ({name, 
	description, 
	price, 
	imageUrl, 
	inStock, 
	category
}) => {
	try{
		
		const {rows: [product]} = await client.query(`
			INSERT INTO products (name, description, price, "imageURL", "inStock", category)
			VALUES($1, $2, $3, $4, $5, $6)
			RETURNING *;
		`, [name, 
			description, 
			price, 
			imageUrl, 
			inStock, 
			category
		]);
		return product;
	}
	catch(err){
		throw err;
	}
};



const createInitialProducts = async () => {
	try{
		
		const productsToCreate = [
			{ 	name: 'very good thing',
				description: "IT'S A GREAT THING!",
				price: 2000,
				imageUrl: 'placeholder',
				inStock: false,
				category:  'good thing'},
			{ 	name: 'fancy thing',
				description: "IT'S FANCY!",
				price: 200000,
				imageUrl: 'placeholder',
				inStock: true,
				category:  'fancy things' },
			{ 	name: 'an everyday thing', 
				description: "IT'S REALLY A STANDARD THING!",
				price: 200,
				imageUrl: 'placeholder',
				inStock: true,
				category:  'standard things' },
			{ 	name: 'rare thing',
				description: "IT'S RARE!",
				price: 20000000,
				imageUrl: 'placeholder',
				inStock: true,
				category:  'rare things' }
		];
		
		const products = await Promise.all(productsToCreate.map(createProduct));
	}
	catch(err){
		throw err;
	}
};

const createUser = async ({
	firstName,
  lastName,
  email,
  username,
  password,
  imageURL
}) => {
	console.log('starting to create a user');
	try{
		const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
		const { rows: [user] } = await client.query(`
			INSERT INTO users("firstName", "lastName", email, username, password, "imageURL")
			VALUES($1, $2, $3, $4, $5, $6)
			RETURNING id, username;
		`, [firstName, lastName, email, username, hashedPassword, imageURL]);
		return user;
	}
	catch(error) {
		throw error;
	}
};

const createInitialUsers = async () => {
	try{
		console.log('Starting to create initial users');
		const usersToCreate = [
			{ 
				firstName: 'Henry', 
				lastName: "Hugglefish", 
				email: 'henryhugglefish@huggamugga.com', 
				username: 'Henry', 
				password: 'password', 
				imageURL: 'https://static01.nyt.com/images/2021/01/12/science/30TB-CUTTLEFISH/merlin_181764690_5e368578-7779-4fda-9e87-ed64ba987d44-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
			},
      {
				firstName: 'Boaty', 
				lastName: 'McBoatface', 
				email: 'boatyboat@boat.com', 
				username: 'Skipper', 
				password: 'dipper', 
				imageURL: 'https://static01.nyt.com/images/2016/03/22/nytnow/22xp-boaty/22xp-boaty-superJumbo.jpg',
      },
      { 
		    firstName: 'Anita', 
		    lastName: 'Bath', 
		    email: 'Anita@bath.com', 
		    username: 'calgon', 
		    password: '12345678', 
		    imageURL: 'https://images-na.ssl-images-amazon.com/images/I/911Wlv75POL._AC_SL1500_.jpg',
      },
      {
      	firstName: 'Ollie', 
      	lastName: 'Tabogger', 
      	email: 'yummy@delish.com', 
      	username: 'imonlyseven', 
      	password: 'sevenisbest', 
      	imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Child_sledding_head-first_on_a_toboggan.jpg/1200px-Child_sledding_head-first_on_a_toboggan.jpg',
      },
    ];
  	
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('USERS CREATED:', users);
    console.log('FINISHED CREATING USERS');
	}
	catch(error){
		throw error;
	}
}

const createOrder = async ({userId, status}) => {
	console.log('creating order...');
	try{
		const {rows: [order]} = await client.query(`
		INSERT INTO orders("userId", status)
		VALUES ($1, $2)
		RETURNING *;
		`, [userId, status]);
		console.log('order: ', order);
		return order;
	}catch(error){
		throw error;
	}
};

const createInitialOrders = async () => {
	console.log('creating initial orders...');
	try{
		const ordersToCreate = [
			{
				status: 'created',
				userId: 2
			},
			{
				status: 'placed',
				userId: 3
			},
			{
				status: 'submitted',
				userId: 1
			}
		];
		
		const orders = await Promise.all(ordersToCreate.map(createOrder));
		console.log('test orders: ', orders);
	}catch(error){
		throw error;
	}
};

const createOrderProduct = async ({productId, orderId, price, quantity}) => {
	console.log('creating order_products...');
	try{
		const {rows: [order_product]} = await client.query(`
		INSERT INTO order_products("productId", "orderId", price, quantity)
		VALUES ($1, $2, $3, $4)
		RETURNING *;
		`, [productId, orderId, price, quantity]);
		console.log('order_product: ', order_product);
		return order_product;
	}catch(error){
		throw error;
	}
};

const createInitialOrderProducts = async () => {
	console.log('creating initial order_products...');
	try{
		const orderProductsToCreate = [
			{
				productId: 1,
				orderId: 1,
				price: 12,
				quantity: 1
			}
		];
		const order_products = await Promise.all(orderProductsToCreate.map(createOrderProduct));
		console.log('test order_products: ', order_products);
	}catch(error){
		throw error;
	}
};



// export
module.exports = {
  client,
  dropTables,
  buildTables,
  createInitialProducts,
  createProduct,
  createUser,
  createInitialUsers,
  createOrder,
  createInitialOrders,
  createOrderProduct,
  createInitialOrderProducts,
}
