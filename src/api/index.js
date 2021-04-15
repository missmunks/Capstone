import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
	try{
		const { data: products } = await axios.get('/api/products');
		return products;
	}
	catch(error) {
		throw error;
	}
}

export async function getProductById(id) {
	try{
		const {data} = await axios.get(`/api/products/${id}`)
		return data;
	}catch(error) {
		throw error;
	}
}

export async function login({username, password}) {

	try{
		const {data} = await axios.post(`/api/users/login`, {username, password});
		return data;
	}
	catch(error){
		throw error;
	}
}

export async function register({
	firstName,
  lastName,
  email,
  username,
  password,
  imageURL
}) {
	try{
		const {data} = await axios.post('/api/users/register', {
			firstName,
			lastName,
			email,
			username,
			password,
			imageURL
		});
		return data;
	}
	catch(error){
		throw error;
	}
}

export async function getMe(token) {
	try{
		const {data} = await axios.get('/api/users/me', {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		return data;
	}
	catch(error){
		throw error;
	}
};

export async function getOrdersByUser(user, token) {
	try{
		const {data} = await axios.get(`/api/users/${user.id}/orders`, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		return data
	}
	catch(error){
		throw error;
	}
}

export async function getCart(token) {
	try{
		const {data} = await axios.get(`api/orders/cart`, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		return data;
	}
	catch(error){
		throw error;
	}
}

//the route this queries currently requires user... so we'll have to change that for non-users to make a cart
export async function createOrder(token) {
	try{
		const {data} = await axios.post(`api/orders`, {}, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		return data;
	}
	catch(error){
		throw error;
	}
}

export async function addToCart(cartId, product, token) {
	try{
		console.log('/api/index.js THE ADDTOOCART FUNCTION NEEDS ADD AN ORDER TO THE CART WITH AN AXIOS CALL', cartId, product, token);
		const {data} = await axios.post(`api/orders/${cartId}/products`, {
			productId: product.id, 
			price: product.price, 
			quantity : 1,
		}, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		});
		return data;
	}
	catch(error){
		throw error;
	}
}

export async function cancelOrder(order, token) {
	try{
		const {data} = await axios.delete(`/api/orders/${order}`, {
			headers: {
				Authorization : `Bearer ${token}`
			}
		// data = null;
		});
	  }catch(error) {
		throw error;
	}
}

export async function completeOrder(order, token, orderId) {

try{
const {data} = await axios.patch(`api/orders/${order}`, {status : 'completed'}, {
	headers: {
		Authorization : `Bearer ${token}`
	},	

})

}catch(error) {
throw error;
}
}


