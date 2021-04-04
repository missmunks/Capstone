import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {getMe} from '../api/index.js';


const MyAccount = ({user, token}) => {
	const [myData, setMyData] = useState({});
	const getCurrentUser = async (token) => {
		try{
			const theUser = await getMe(token);
			return theUser;
		}
		catch(error){
			throw error;
		}
	};
	
	useEffect( () => {
		const getAndSetTheUser = async () => {
			const userToSet = await getCurrentUser(token)
			if (userToSet){
				setMyData(userToSet);
			}
		};
		getAndSetTheUser();
	}, []);

	return <>
		<h3>{user.username}'s account page</h3>
		<div>THIS FETCHES ALL DATA FROM THE USER BUT THERES NOTHING INTERESTING TO SHOW. MAYBE SOON IT NEEDS TO BE UPDATED TO FETCH THE CART/ FETCH PREVIOUS ORDERS FROM THE USER/ ALLOW THE USER TO UPDATE THEIR INFO.</div>
	</>
}


export default MyAccount;
