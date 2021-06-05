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


const updateUser = async (fields = {}) => { 
    const {id, password} = fields;
    const setString = Object.keys(fields).map((key, index) => {
        if (key === "firstName" || key === "lastName" || key === "isAdmin") {
            return `"${key}"=$${index + 1}`;
        } else {
            return `${key}=$${index + 1}`;
        }
    }).join(', ');

    try {

        if (password) {
            const SALT_COUNT = 10; 
            const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

            const { rows: [user] } = await client.query(` 
                UPDATE users
                SET ${setString}
                WHERE id = ${id}
                RETURNING *; 
            `, Object.values(fields));

            password = hashedPassword
            delete user.password; 
            return user;
        } else {
            const { rows: [user] } = await client.query(` 
                UPDATE users
                SET ${setString}
                WHERE id = ${id}
                RETURNING *; 
            `, Object.values(fields));
            return user;
        }
    } catch (error) {
        throw error; 

    }
}

module.exports = {

    destroyProduct,
    updateProduct,
    updateUser

}