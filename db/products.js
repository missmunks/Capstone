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

const destroyProduct = async ({ id }) => {
    try {
        const {rows: [product] = await client.query(`
        DELETE FROM products
        WHERE id=$1
        `, [id])
    }
   return order
    } catch (error) {
        throw error
    }
}

const updateProduct = async (fields = {}) => {
    const {id} = fields;

    const setString = Object.keys(fields).map((key, index) => {
        if (key === "imageURL" || key === "inStock") {
            return `"${key}"=$${index + 1}`;
        } else {
            return `${key}=$${index + 1}`;
        }
    }).join(', ');

    try {
        const {rows: [product]} = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `, Object.values(fields));

        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {
	createProduct,
	createInitialProducts,
	getAllProducts,
	getProductById,
	destroyProduct,
	updateProduct
}