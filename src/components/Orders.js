import React, {useState} from 'react';
import {Order} from './';

const Orders = ({orders, token, setCart}) => {
	const [showOrders, setShowOrders] = useState(false);
	const handleShow = () => {setShowOrders(!showOrders)};
	
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
