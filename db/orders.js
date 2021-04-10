const {client} = require('./index');
const { getUserById } = require('./users');


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



module.exports = {
	getAllOrders,
	getOrderById,
	getOrdersByUser,
}
