import React, {useState} from 'react'


const AdminSingleUser = ({user, allUsers}) => {

    console.log(allUsers, 'aaaaaaaaaaaaaall users')
    
    const {id,
        firstName, 
        lastName,
        email, 
        imageURL,
        username,
        password, 
        isAdmin} = user;

    console.log(user, "this is a single user")

        // const findUser = async(userId) => {
        //     allUsers.map(aUser => {
        //         if(aUser.id === userId) {
        //             return <h1>The map is working</h1>
        //         }
        //     })
        // }

        // const handleClick = (event) => {
        //     event.preventDefault();
        //     findUser(event.target.id);
        //     return <h1>Handle Click</h1>
        //     }
  


    return <>
            {/* <button onClick = {handleClick} >Update User</button> */}
    </>
};


export default AdminSingleUser;
