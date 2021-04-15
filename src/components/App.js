import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {
  getSomething,
  getAllProducts,
  getCart,
} from '../api';

import{
  Header,
  Nav,
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

	// local storage: 
	// else { return DEFAULT VALUE}
	
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
			setCart(queriedCart);
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
  }, [cart]);

  return <>
    <Header token={token} setToken={setToken} user={user} setUser={setUser}/>

    <div className="bulk">
      

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
				<Orders orders={orders} setOrders={setOrders} token={token} user={user}/>
			</Route>
			
			<Route exact path ='/orders/:orderId'>
				<Order />
			</Route>
			<Route exact path ='/cart'>
				<Cart cart={cart} setCart={setCart} token={token}/>
			</Route>
			
    </div>

    <Footer/>
  </>
}

export default App;
