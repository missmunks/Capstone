const {client} = require('./index');
const { getUserById } = require('./users');

// These two functions serve to fetch and append the order products to each order. getAndAppendProducts can be called at the end of any of these database adapters to add a key called "orderProducts" to the order object with a value set to an array of all of the individual orderProducts.
const getOrderProductsByOrder = async(orderId) => {
	try{
		const { rows: orderProducts } = await client.query(`
			SELECT *
			FROM order_products
			WHERE "orderId"=${orderId}
		`);
		return orderProducts;
	}
	catch(error){
		throw error;
	}
};

const getAndAppendProducts = async (order) => {
	try{
		const orderProducts = await getOrderProductsByOrder(order.id);
		order.products = await orderProducts;
		return order;
	}
	catch(error){
		throw error;
	}
};





const getAllOrders = async() => {
    try {
    		console.log('GETTING ALL ORDERS');
        const {rows: orders } = await client.query(`
            SELECT *
            FROM orders
        `);
        console.log('MAPPING ORDERS');
       	return Promise.all(orders.map(order => getAndAppendProducts(order)));
    }catch(error) {
        throw error;
    }
};

const getOrderById = async (id) => {
	try{
		const {rows: [order]} = await client.query(`
			SELECT *
			FROM orders
			WHERE id=${id};
		`);
		return getAndAppendProducts(order);
	}
	catch(error){
		throw error;
	}
};

const getOrdersByUser = async ({id}) => {
	try{
		const {rows: orders} = await client.query(`
			SELECT *
			FROM orders
			WHERE "userId"=${id};
		`);
		return getAndAppendProducts(order);
	}
	catch(error){
		throw error;
	}
};

const getOrdersByProduct = async ({ id }) => {
	try{
		const {rows: [order]} = await client.query(`
			SELECT orders.id, orders.status, orders."userId", orders."datePlaced"
			FROM orders
			JOIN order_products ON order_products."orderId" = orders.id
			WHERE order_products."productId"=${id}
		`);
		return getAndAppendProducts(order);
	}
	catch(error){
		throw error;
	}
};

getOrdersByProduct({id: 1}).then(console.log)



module.exports = {
	getAllOrders,
	getOrderById,
	getOrdersByUser,
	getOrdersByProduct,
}
