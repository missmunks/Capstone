import React from 'react';
import { Link } from 'react-router-dom';
import home from '../home.png';


const Home = ({user}) => {

    return  <div className='homePage'>
                <h1>{user.username && <div>Hello, {user.username}.</div> }</h1>
                <img className="homePhoto" src={home}/>
                <h2 type='homeText'>Matt has things, Jess has things, Joseph has things, Sav has things...</h2>
                <h3>don't be left out. Get some things.</h3>
                <Link className='productsHomeLink' to='/products'>Show me all the things!</Link>
            </div>

}

export default Home;