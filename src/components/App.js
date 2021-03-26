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
  console.log('PRODUCTS FROM STATE', products);

	const fetchAndSetProducts = async () => {
		try{
			console.log('GOING TO FETCH AND SET PRODUCTS');
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
			{products.map(product => {
				return <Route exact path ={`/products/${product.id}`}>
					<Product product={product}/>
				</Route>
			})}
    </div>
  </Router>
  );
}

export default App;
