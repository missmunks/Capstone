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
        const {rows: orders } = await client.query(`
            SELECT *
            FROM orders
        `);
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
		return Promise.all(orders.map(order => getAndAppendProducts(order)));	
	}
	catch(error){
		throw error;
	}
};

const getOrdersByProduct = async ({ id }) => {
	try{
		const {rows: order} = await client.query(`
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



const getCartByUser = async ({id}) => {
	try{
		const orders = await getOrdersByUser({id});
		const [cart] = orders.filter(order => order.status === 'created')
		return cart;
	}catch(error){
		throw error;
	}

};

//TESTED WORKING
const updateOrder = async ({ id, status, userId }) => {
	const settingObj = { status, userId };
	
	function createUpdate(table, data) {
    if (!table || typeof table !== 'string') {
        throw new TypeError("Parameter 'table' must be a non-empty string.");
    }
    if (!data || typeof data !== 'object') {
        throw new TypeError("Parameter 'data' must be an object.");
    }
    var keys = Object.keys(data)
        .filter(function (k) {
            return data[k] !== undefined;
        });
    var names = keys.map(function (k, index) {
        return '"' + k + '"' + ' = $' + (index + 1);
    }).join(', ');
    var values = keys.map(function (k) {
        return data[k];
    });
    return {
        query: 'UPDATE ' + table + ' SET ' + names + ` WHERE id=${id} RETURNING *;`,
        values: values
    };
	}
	
	const update = createUpdate('orders', settingObj);
	
	
	try{
		const {rows: [order] } = await client.query(update.query, update.values);
		return order;
	}
	catch(error){
		throw error;
	}
};

//TESTED WORKING
const completeOrder = async ({ id }) => {
	try{
		const { rows: [completedOrder] } = await client.query(`
			UPDATE orders
			SET status='completed'
			WHERE id=${id}
			RETURNING *;
		`);
		return completedOrder;
	}
	catch(error){
		throw error;
	}
};

//TESTED WORKING
const cancelOrder = async (id) => {
	try{
		const {rows: [cancelledOrder]} = await client.query(`
			UPDATE orders
			SET status='cancelled'
			WHERE id=${id}
			RETURNING *;
		`);
		return cancelledOrder;
	}
	catch(error){
		throw error;
	}
};



module.exports = {
	getAllOrders,
	getOrderById,
	getOrdersByUser,
	getOrdersByProduct,
	getCartByUser,
	updateOrder,
	completeOrder,
	cancelOrder
}
