const {client} = require('./index');

const getOrderProductById = async (id) => {
    try{
        const {rows: [order_product]} = await client.query(`
        SELECT *
        FROM order_products
        WHERE id=${id};`);
        return order_product;
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
        RETURNING *
        `, [orderId, productId, price, quantity]);
        return order_products;
    }catch(error){
        throw error;
    }
};

const updateOrderProduct = async(fields) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index+1}`).join(', ');
    try{
        const {rows: [order_product]} = await client.query(`
        UPDATE order_products
        SET ${setString}
        WHERE id=${fields.id}
        RETURNING *;
        `, Object.values(fields));
        return order_product;
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