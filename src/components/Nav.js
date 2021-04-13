import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


const Nav = ({ token, setToken, setUser }) => {
	const history = useHistory();
    return <>
    	<nav className='navLinks'>
				<Link to='/'>Home</Link>
				<Link to='/products'>Products</Link>
				<Link to={`/products/:id`}></Link>
				{ token && <Link to='/orders'>Orders</Link> }
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
