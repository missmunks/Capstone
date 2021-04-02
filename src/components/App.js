import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import logo from '../LOGO.png';
import socials from '../socials.png';

import {
  getSomething,
  getAllProducts
} from '../api';

import{
  Header,
  Nav,
  Products,
  Product,
  Footer
} from './';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

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

  return (
  <Router>

    <Header>
      <img className="logo" src={logo}/>
      <Nav />
    </Header>

    <div className="bulk">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
      <Route exact path='/products'>
      	<Products products={products} setProducts={setProducts}/>
      </Route>
			<Route exact path={`/products/:id`}>
				<Product products={products} />
			</Route>
    </div>

    <Footer>
			<p className="copyright">Copyright © 1997 - 2021 GET BUFF Franchising, LLC.</p>
			<img className="socials" src={socials}/>
		</Footer>

  </Router>
  );
}

export default App;
