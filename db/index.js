// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'grace-shopper-db'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
async function dropTables() {
  console.log('dropping all tables');
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
  console.log('building all tables');
  try{
		await client.query(`
		  CREATE TABLE products(
		    id SERIAL PRIMARY KEY,
		    name VARCHAR(255) NOT NULL,
		    description VARCHAR(255) NOT NULL,
		    price INTEGER NOT NULL,
		    imageURL VARCHAR(255),
		    inStock BOOLEAN DEFAULT false,
		    category VARCHAR(255) NOT NULL
		  );
		`);
		await client.query(`
		    CREATE TABLE users(
		      id SERIAL PRIMARY KEY,
		      firstName VARCHAR(255) NOT NULL,
		      lastName VARCHAR(255) NOT NULL,
		      email VARCHAR(255) UNIQUE NOT NULL,
		      imageURL VARCHAR(255) NOT NULL,
		      username VARCHAR(255) NOT NULL,
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

// export
module.exports = {
  client,
  dropTables,
  buildTables,
}
