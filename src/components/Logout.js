import React from 'react';
import { Link, useHistory } from 'react-router-dom';


const Logout = ({setToken, setUser}) => {
    const history = useHistory();
return <>
<button onClick = {
    () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('')
        setUser({});
        history.push('/');
    }
}>
Logout</button>
</>
}

export default Logout;