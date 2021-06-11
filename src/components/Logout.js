import React from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';


const Logout = ({setToken, setUser}) => {
    const history = useHistory();

    const eraseToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('')
        setUser({});
        history.push('/');
    }

    eraseToken();

    return <Redirect to='/' />

}



export default Logout;