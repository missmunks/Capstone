import React from 'react';
import { Link, useHistory } from 'react-router-dom';


const Nav = ({ token, setToken, setUser, user }) => {
	console.log(user, 'this is the current user')
	console.log(user.isAdmin, 'this is the admin property')
	const history = useHistory();
    return <>
    	<nav className='navLinks'>
				<Link to='/'>Home</Link>
				<Link to='/products'>Products</Link>
				<Link to={`/products/:id`}></Link>
				{user.isAdmin ? <Link to='/users'>All Users</Link> : ""}
				{user.isAdmin ? <Link to='/users/add'>Add User</Link> : ""}
				{user.isAdmin ? <Link to='/AdminAllOrders'>All Orders</Link> : ""}
				{ token && <Link to='/cart'>My Cart</Link> }
				{!token && <Link to='/login'>Login/Register</Link>}
				{ token && <Link to='/myaccount'>My Account</Link>}
				{ token && <button className="logout" onClick = {
					() => {
						localStorage.removeItem('token');
						localStorage.removeItem('user');
						setToken('')
						setUser({});
						history.push('/');
					}
				}>
				Logout</button>}
			</nav>
		</>
}

export default Nav;
