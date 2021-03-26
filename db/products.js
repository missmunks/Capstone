const {client} = require('./index');
	console.log('CLIENT', client);

const createProduct = async ({name, description, price, imageUrl, inStock, category}) => {
	console.log('starting to create products');
	try{
	const {rows: [product]} = await client.query(`
		INSERT INTO products (name, description, price, "imageURL", "inStock", category)
		VALUES($1, $2, $3, $4, $5, $6)
		RETURNING *
	`, [name, description, price, imageUrl, inStock, category]);
	return product;}
	catch(err){
		throw err;
	}
};



const createInitialProducts = async () => {
	try{
		console.log('starting to create initial products');
		
		const productsToCreate = [
			{ name: 'very good product', description: "IT'S GREAT!", price: 2000, imageUrl: 'placeholder', inStock: false, category:  'good stuff'},
			{ name: 'fancy product', description: "IT'S FANCY!", price: 200000, imageUrl: 'placeholder', inStock: true, category:  'fancy stuff' },
			{ name: 'an everyday product', description: "IT'S STANDARD!", price: 200, imageUrl: 'placeholder', inStock: true, category:  'standard stuff' },
			{ name: 'rare product', description: "IT'S RARE!", price: 20000000, imageUrl: 'placeholder', inStock: true, category:  'rare stuff' }
		];
		
		const products = await Promise.all(productsToCreate.map(product => createProduct(product)));
		console.log('PRODUCTS CREATED:', products);
		console.log('FINISHED CREATING PRODUCTS');
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
    console.log('getting product by id', id);
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
