// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'change-this-name'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
async function dropTables() {
  console.log('dropping all tables');
  await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
  `);
};

async function buildTables() {
  console.log('building all tables');
  await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL,
      imageURL VARCHAR(255) FULLY,
      inStock BOOLEAN DEFAULT false,
      category VARCHAR(255) NOT NULL
    );
  `);
  await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email UNIQUE NOT NULL,
        imageURL VARCHAR(255) NOT NULL,
        username UNIQUE NOT NULL,
        password UNIQUE NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      )
  `);
await client.query(``);
await client.query(``);  
};

// export
module.exports = {
  client,
  // db methods
}