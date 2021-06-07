import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {
  getSomething,
  getAllProducts,
  getCart,
  getProductById,
  getOrdersByUser,
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
	Success,
	Logout,
	Users,
	AdminAllOrders
} from './';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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
	const [singleUser, setSingleUser] = useState([]);
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
	
	const fetchAndSetOrders = async (user, token) => {
		try{
			const queriedOrders = await getOrdersByUser(user, token);
			if(queriedOrders){
				queriedOrders.forEach(async order => {
					for(let i = 0; i< order.products.length; i++){
						const curr = order.products[i];
						const currId = await getProductById(curr.productId);
						curr.name = currId.name;
					};
				});
				setOrders(queriedOrders);
			}
		}
		catch(error){
			console.log(error);
		}
	};
	
	const fetchAndSetCart = async (token) => {
		try{
			if (!token){
				return
			}
			const queriedCart = await getCart(token);
			if(queriedCart){
				for(let i = 0; i < queriedCart.products.length; i++){
					const curr = queriedCart.products[i];
					const currId = await getProductById(curr.productId);
					curr.name = currId.name;
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
		fetchAndSetOrders(user, token);
		fetchAndSetCart(token);
  }, [token, user]);

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

			<Route exact path='/logout'>
				<Logout setToken={setToken} setUser={setUser} />
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
			
			<Route exact path ='/success'>
				<Success />
			</Route>

			<Route path = '/users'>
				<Users  user={user} setSingleUser={setSingleUser}  allUsers={allUsers} setAllUsers={setAllUsers} token={token} />
			</Route>

			
            

			<Route exact path= '/AdminAllOrders' >
				<AdminAllOrders  />
			</Route>
    </div>

    <Footer/>
  </>
}

export default App;
