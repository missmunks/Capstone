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
		const {data} = await axios.post(`/api/users/login`, {
			username: "johnbonjovi",
    	password: "passwordo"
		});
		return data;
	}
	catch(error){
		throw error;
	}
}
