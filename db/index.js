// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'grace-shopper-db'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);
const placeholderImg = require('./placeholder');

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
		    "imageURL" VARCHAR(255),
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
		      "imageURL" VARCHAR(255) DEFAULT "placeholderImg" NOT NULL,
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
				"datePlaced" DATE NOT NULL
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

const createProduct = async ({name, description, price, imageUrl, inStock, category}) => {
	try{
		if(price.value.typeOf === ''){
			console.error('price must be a number')
		}
		const {rows: [product]} = await client.query(`
			INSERT INTO products (name, description, price, "imageURL", "inStock", category)
			VALUES($1, $2, $3, $4, $5, $6)
			RETURNING *;
		`, [name, description, price, imageUrl, inStock, category]);
		return product;
	}
	catch(err){
		throw err;
	}
};



const createInitialProducts = async () => {
	try{
		
		const productsToCreate = [
			{ name: 'very good product', description: "IT'S GREAT!", price: 2000, imageUrl: 'placeholder', inStock: false, category:  'good stuff'},
			{ name: 'fancy product', description: "IT'S FANCY!", price: 200000, imageUrl: 'placeholder', inStock: true, category:  'fancy stuff' },
			{ name: 'an everyday product', description: "IT'S STANDARD!", price: 200, imageUrl: 'placeholder', inStock: true, category:  'standard stuff' },
			{ name: 'rare product', description: "IT'S RARE!", price: 20000000, imageUrl: 'placeholder', inStock: true, category:  'rare stuff' }
		];
		
		const products = await Promise.all(productsToCreate.map(createProduct));
	}
	catch(err){
		throw err;
	}
};


// export
module.exports = {
  client,
  dropTables,
  buildTables,
  createInitialProducts,
}
