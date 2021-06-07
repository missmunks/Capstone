import React, {useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';

const Users = ({user, allUsers, setAllUsers,  token, setSingleUser }) => {

    console.log(user, 'this is the user I am passing in to the users component')
    console.log(token, 'this is the token I am passing in to the users component')

   const fetchUsers = async() => {
        try {
          const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          console.log(data, 'this is the date from the fetchUsers call')
          setAllUsers(data);
          return allUsers
    
        } catch (error) {
          console.error(error);
        }
      }
      
      useEffect( () => {
          fetchUsers()
      }, [])


            console.log(allUsers, 'this is all users')

      if (user.isAdmin) {
        return (<>
         
            <div className='allUsers'>

                {allUsers.map(_user => {
                    const {id, username, isAdmin, email, firstName, lastName, imageURL} = _user;

                    return (<div className='single-user' key={id}>
                        <div> 
                        <br />
                        <Link to={`/users/${id}`}><h3 onClick={() => setSingleUser(user)}>{username}</h3></Link>
                        <div>User ID: {id}</div>
                        <div>email {email}</div>
                        <div>Name: {firstName} {lastName}</div>
                        <div>
                            <h1>Profile Picture:</h1>
                            <img src={imageURL} />
                            </div>
                        <div>isAdmin? {isAdmin ? 'Yes' : 'No'}</div>
                       
                        </div>
                    </div>)
                })}
            </div>
           
            <Link to='/users/add'><button className="btn">Add A New User</button></Link>
            
        </>)
    } else {
        return <Redirect to='/' />
    }

   
}

export default Users;