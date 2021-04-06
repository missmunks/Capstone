const {client} = require('./index');

const getOrderProductById = async (id) => {
    try{
        const {rows: [order_products]} = await client.query(`
        SELECT *
        FROM order_products
        WHERE id=${id};`);
        return order_products;
    }catch(error){
        throw error;
    }
};

//needs to update order_product if exists
const addProductToOrder = async ({orderId, productId, price, quantity}) => {
    try{
        const {rows: [order_products]} = await client.query(`
        INSERT INTO order_products ("orderId", "productId", price, quantity)
        VALUES ($1, $2, $3, $4)
        `, [orderId, productId, price, quantity]);
        return order_products;
    }catch(error){
        throw error;
    }
};

const updateOrderProduct = async({id, price, quantity}) => {
    try{
        const {rows: [order_products]} = await client.query(`
        UPDATE order_products
        SET price = $1, quantity = $2
        WHERE id=${id};
        `, [price, quantity]);
        return order_products;
    }catch(error){
        throw error;
    }
};

const destroyOrderProduct = async(id) => {
    try{
        const {rows: [order_products]} = await client.query(`
        DELETE FROM order_products
        WHERE id=${id};
        `);
        return order_products;
    }catch(error){
        throw error;
    }
};

module.exports = {
	getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct
}