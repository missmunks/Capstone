import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {
  getSomething,
  getAllProducts
} from '../api';

import{
Products,
Product,
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
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
      <Route exact path='/products'>
      	<Products products={products} setProducts={setProducts}/>
      </Route>
			<Route exact path={`/products/:id`}>
				<Product products={products} />
			</Route>
    </div>
  </Router>
  );
}

export default App;
