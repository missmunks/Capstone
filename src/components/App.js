import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';



import {
  getSomething,
  getAllProducts
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
	console.log('THE CURRENT USER', user);
	
	
	const fetchAndSetProducts = async () => {
		try{
		  const queriedProducts = await getAllProducts();
		  setProducts(queriedProducts);
    }
    catch(error){
    	console.log(error)
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
  }, []);

  return <>
    <Header token={token} setToken={setToken} user={user} setUser={setUser}/>

    <div className="bulk">
      
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>

      <Route exact path='/products'>
      	<Products products={products} setProducts={setProducts}/>
      </Route>

			<Route exact path={`/products/:id`}>
				<Product products={products} />
			</Route>

			<Route exact path='/register'>
				<Register setToken={setToken} setUser={setUser}/>
			</Route>

			<Route exact path='/login'>
				<Login setToken={setToken} setUser={setUser}/>
			</Route>
			<Route exact path ='/myaccount'>
				<MyAccount token={token} user={user}/>
			</Route>
			
    </div>

    <Footer/>
  </>
}

export default App;
