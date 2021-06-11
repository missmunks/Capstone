import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {
  getSomething,
  getAllProducts,
  getCart,
  getProductById,
  getOrdersByUser,
  getUsers,
  getAllOrders
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
	AdminUsers,
	AdminAllOrders,
	AdminSingleUser,
	AdminAddUser,
	AdminAddProduct,
	AdminEditProduct
} from './';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL]= useState('');
  const [inStock, setInStock] = useState('');
  const [category, setCategory]= useState('');
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

	const states = [
		{ 'label':'Alabama', 'value': 'AL' },
		{ 'label':'Alaska', 'value': 'AK'},
		{ 'label':'American Samoa', 'value': 'AS'},
		{ 'label':'Arizona', 'value': 'AZ'},
		{ 'label':'Arkansas', 'value': 'AR'},
		{ 'label':'California', 'value': 'CA'},
		{ 'label':'Colorado', 'value': 'CO'},
		{ 'label':'Connecticut', 'value': 'CT'},
		{ 'label':'Delaware', 'value': 'DE'},
		{ 'label':'District of Columbia', 'value': 'DC'},
		{ 'label':'States of Micronesia', 'value': 'FM'},
		{ 'label':'Florida', 'value': 'FL'},
		{ 'label':'Georgia', 'value': 'GA'},
		{ 'label':'Guam', 'value': 'GU'},
		{ 'label':'Hawaii', 'value': 'HI'},
		{ 'label':'Idaho', 'value': 'ID'},
		{ 'label':'Illinois', 'value': 'IL'},
		{ 'label':'Indiana', 'value': 'IN'},
		{ 'label':'Iowa', 'value': 'IA'},
		{ 'label':'Kansas', 'value': 'KS'},
		{ 'label':'Kentucky', 'value': 'KY'},
		{ 'label':'Louisiana', 'value': 'LA'},
		{ 'label':'Maine', 'value': 'ME'},
		{ 'label':'Marshall Islands', 'value': 'MH'},
		{ 'label':'Maryland', 'value': 'MD'},
		{ 'label':'Massachusetts', 'value': 'MA'},
		{ 'label':'Michigan', 'value': 'MI'},
		{ 'label':'Minnesota', 'value': 'MN'},
		{ 'label':'Mississippi', 'value': 'MS'},
		{ 'label':'Missouri', 'value': 'MO'},
		{ 'label':'Montana', 'value': 'MT'},
		{ 'label':'Nebraska', 'value': 'NE'},
		{ 'label':'Nevada', 'value': 'NV'},
		{ 'label':'New Hampshire', 'value': 'NH'},
		{ 'label':'New Jersey', 'value': 'NJ'},
		{ 'label':'New Mexico', 'value': 'NM'},
		{ 'label':'New York', 'value': 'NY'},
		{ 'label':'North Carolina', 'value': 'NC'},
		{ 'label':'North Dakota', 'value': 'ND'},
		{ 'label':'Northern Mariana Islands', 'value': 'MP'},
		{ 'label':'Ohio', 'value': 'OH'},
		{ 'label':'Oklahoma', 'value': 'OK'},
		{ 'label':'Oregan', 'value': 'OR'},
		{ 'label':'Palau', 'value': 'PW'},
		{ 'label':'Pennsylvania', 'value': 'PA'},
		{ 'label':'Puerto Rico', 'value': 'PR'},
		{ 'label':'Rhode Island', 'value': 'RI'},
		{ 'label':'South Carolina', 'value': 'SC'},
		{ 'label':'South Dakota', 'value': 'SD'},
		{ 'label':'Tennessee', 'value': 'TN'},
		{ 'label':'Texas', 'value': 'TX'},
		{ 'label':'Utah', 'value': 'UT'},
		{ 'label':'Vermont', 'value': 'VT'},
		{ 'label':'Virgin Islands', 'value': 'VI'},
		{ 'label':'Virginia', 'value': 'VA'},
		{ 'label':'Washington', 'value': 'WA'},
		{ 'label':'West Virginia', 'value': 'WV'},
		{ 'label':'Wisconsin', 'value': 'WI'},
		{ 'label':'Wyoming', 'value': 'WY'}
		];
	

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

			<Route exact path = '/users'>
				<AdminUsers  user={user} setSingleUser={setSingleUser}  allUsers={allUsers} setAllUsers={setAllUsers} token={token} />
			</Route>

			<Route exact path = '/users/:userId' >
				<AdminSingleUser user={user} singleUser={singleUser} setSingleUser={setSingleUser} />
			</Route>

			<Route exact path = '/users/add' >
				<AdminAddUser user={user} getUsers={getUsers} states={states} />
			</Route>

			<Route exact path= '/AdminAllOrders' >
				<AdminAllOrders  user={user} orders={orders} getAllOrders = {getAllOrders} />
			</Route>

			<Route exact path = '/AdminAddProduct' >
				<AdminAddProduct token={token} name={name} setName={setName} description={description} setDescription={setDescription} price={price} setPrice={setPrice} imageURL={imageURL} setImageURL={setImageURL} category={category} setCategory={setCategory} inStock={inStock} setInStock={setInStock} />
			</Route>

			<Route exact path='/AdminEditProduct' >
				<AdminEditProduct token={token} name={name} setName={setName} description={description} setDescription={setDescription} price={price} setPrice={setPrice} imageURL={imageURL} setImageURL={setImageURL} category={category} setCategory={setCategory} inStock={inStock} setInStock={setInStock} />
			</Route>
    </div>

    <Footer/>
  </>
}

export default App;
