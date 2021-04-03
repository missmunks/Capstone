const {client, dropTables} = require('./index');
const bcrypt = require('bcrypt');


const getUserByUsername = async (username) => {
  try {
    const { rows: [user] } = await client.query(`
		  SELECT id, username
		  FROM users
		  WHERE username=$1;
    `, [username]);
    return user;
  } catch (error) {
      throw error
  }
}

const getUser = async ({username, password}) => {
    try {
        const { rows: [user] } = await client.query(`
        	SELECT *
        	FROM users
        	WHERE username=$1;
        `, [username]);

        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordsMatch){
            const returnObj = { username: user.username, id: user.id };
            return returnObj;
        } 
    } catch (error) {
        throw error
    }  
}

const getUserById = async (id) => {
    try {
        const { rows: [user] } = await client.query(`
        SELECT id, username
        FROM users
        WHERE id=${ id }
        `);
        return user;
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const { rows: users } = await client.query(`
        SELECT id, username, "firstName", "lastName", email, "imageURL", "isAdmin"
        FROM users
        `)
        return users
    } catch (error) {
        throw error
    }
};



module.exports = {
  getUserByUsername,
  getUserById,
  getUser,
  getAllUsers
}
