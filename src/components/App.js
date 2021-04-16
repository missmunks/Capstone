
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {
  getSomething,
  getAllProducts,
  getCart,
  getProductById,
} from '../api';

import{
  Header,
  Home,
  Products,
  Product,
  Footer,
  Register,
	Login,
	MyAccount,
	Order,
	Orders,
	Cart,
} from './';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
	const [token, setToken] = useState( () => {
		if (localStorage.getItem('token')) {
			return localStorage.getItem('token')
		} else {
			return ''
		}
	});
	const [user, setUser] = useState( () => {
		if (localStorage.getItem('user')) {
			const user = localStorage.getItem('user');
			const userObj = JSON.parse(user);
			return userObj;
		}
		else{
			return {};
		}
	});
	const [orders, setOrders] = useState([]);

	const [cart, setCart] = useState({products: []});

	const fetchAndSetProducts = async () => {
		try{
		  const queriedProducts = await getAllProducts();
		  setProducts(queriedProducts);
    }
    catch(error){
    	console.log(error)
    }
	};
	const fetchAndSetCart = async (token) => {
		try{
			if (!token){
				return
			}
			const queriedCart = await getCart(token);
			if(queriedCart){
				const prodNames = [];
				for(let i = 0; i < queriedCart.products.length; i++){
					const curr = queriedCart.products[i];
					console.log(curr);
					const currId = await getProductById(curr.productId);
					console.log(currId);
					curr.name = currId.name;
					console.log(curr);
				};
				setCart(queriedCart);
			}
		}
		catch(error){
			console.log(error);
		}
	};
	
	
  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
		fetchAndSetProducts();
		fetchAndSetCart(token);
  }, [token]);

  return <>
    <Header token={token} setToken={setToken} user={user} setUser={setUser}/>

    <div className="bulk">

			<Route exact path='/'>
				{<Home user={user} />}
			</Route>
			<Route exact path='/products'>
				<Products token={token} products={products} setProducts={setProducts} cart={cart} setCart={setCart}/>
			</Route>

			<Route exact path={`/products/:id`}>
				<Product token={token} products={products} />
			</Route>

			<Route exact path='/register'>
				<Register setToken={setToken} setUser={setUser}/>
			</Route>

			<Route exact path='/login'>
				<Login setToken={setToken} setUser={setUser}/>
			</Route>

			<Route exact path ='/myaccount'>
				<MyAccount token={token} user={user} orders={orders} setOrders={setOrders} />
			</Route>
			
			<Route exact path ='/orders'>
				<Orders orders={orders} setOrders={setOrders} token={token} user={user} setCart= {setCart}/>
			</Route>
			
			<Route exact path ='/orders/:orderId'>
				<Order token = {token} setCart= {setCart} />
			</Route>

			<Route exact path ='/cart'>
				<Cart cart={cart} setCart={setCart} token={token} fetchAndSetCart={fetchAndSetCart}/>
			</Route>
    </div>

    <Footer/>
  </>
}

export default App;
