import React from 'react';
import logo from '../LOGO.png';
import { Nav } from './';

const style = {
    borderBottom: "1px solid #E7E7E7",
    textAlign: "center",
    left: "0",
    top: "0",
    height: "8em",
    width: "100%",
};

const phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }

function Header({ children, token, setToken, user, setUser }) {
    return <>
            <img className="logo" src={logo}/>
            <Nav token={token} setToken={setToken} user={user} setUser={setUser} style={phantom} style={style}>
                { children }
            </Nav>
    </>
}

export default Header;