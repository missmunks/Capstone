import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


const Nav = ({ token, setToken }) => {
	// const history = useHistory();
    return <>
    	<nav className='navLinks'>
				<Link to='/'>Home</Link>
				<Link to='/products'>Products</Link>
				<Link to={`/products/:id`}></Link>
				<Link to='/login'>Login/Register</Link>
				{/* { token && <button className="logout" onClick = {
					() => {
						localStorage.removeItem('token');
						localStorage.removeItem('user');
						setToken('')
						setUser({});
						history.push('/');
					}
				}>
				Logout</button>} */}
			</nav>
		</>
}

export default Nav;
