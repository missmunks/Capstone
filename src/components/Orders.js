import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Order} from './';

const Orders = ({orders, token, user, setCart}) => {
	const [showOrders, setShowOrders] = useState(false);
	const handleShow = () => {setShowOrders(!showOrders)};
	const userId = user.id;
	
	return <>
		<div className='orders-list'>
			<button onClick={handleShow}>{showOrders ? 'hide past orders': 'show past orders'}</button>
			
			{ !showOrders ? '' :
				<div>
				<h2>Your Previous Orders</h2>
				{orders.map(order => {
					return <div key={order.id}>
						<Order order={order} setCart = {setCart} token={token}/>
					</div>
				})};
				</div>
			}
		</div>
	</>
};

export default Orders;
