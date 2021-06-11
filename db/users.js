const {client, dropTables} = require('./index');
const bcrypt = require('bcrypt');


const getUserByUsername = async (username) => {
  try {
    const { rows: [user] } = await client.query(`
		  SELECT id, username, "isAdmin"
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
				if(user){
		      const hashedPassword = user.password;
		      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
		      if (passwordsMatch){
		          const returnObj = { username: user.username, id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, imageURL: user.imageURL, isAdmin: user.isAdmin };
		          return returnObj;
		      } 
      	}
      	else{
      		throw 'no user with those credentials';
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
  getUserByUsername,
  getUserById,
  getUser,
  getAllUsers,
  updateUser
}
