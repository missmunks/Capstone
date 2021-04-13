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
