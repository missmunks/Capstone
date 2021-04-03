const {client} = require('./index');

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
				RETURNING *
			`, [name,
				description,
				price,
				imageUrl,
				inStock,
				category]);
			return product;}
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
		
		const products = await Promise.all(productsToCreate.map(product => createProduct(product)));
	}
	catch(err){
		throw err;
	}
};

const getAllProducts = async () => {
    try {
        const {rows: products} = await client.query(`
            SELECT *
            FROM products
        `);
        return products;
    } catch (error) {
        throw error;
    }
};

const getProductById = async ({id}) => {
    try{
        const {rows: [products]} = await client.query(`
        SELECT *
        FROM products
        WHERE id=${id};`);
        return products;
    }catch(err){
        throw err;
    }
};

module.exports = {
	createProduct,
	createInitialProducts,
	getAllProducts,
	getProductById,
}