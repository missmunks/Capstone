const {client} = require('./index');

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

module.exports = {
    destroyProduct
}