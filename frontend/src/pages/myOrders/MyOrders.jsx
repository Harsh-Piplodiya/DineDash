import React, { useState, useContext, useEffect } from 'react';
import './myOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [ data, setData ] = useState([]);

    // saving the user's order data using the userorders api and saving it in 'data'
    const fetchOrders = async() => {
        const response = await axios.post(url + "/api/v1/order/userorders", {}, { headers: { Authorization: `Bearer ${token}` } });
        setData(response.data.data);
    }

    useEffect(() => {
        // doing to ensure that the user sees the order details only if they're loged in.
        if(token){
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h1>My orders</h1>
            <div className="container">
            { data.map((order, index) => {
                return (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="parcel icon" />
                        <p>
                            {order.items.map((item, itemIndex) => {
                                if(itemIndex === order.items.length - 1){
                                    return `${item.name} x ${item.quantity}`;
                                } else {
                                    return `${item.name} x ${item.quantity}, `;
                                }
                            })}
                        </p>
                        <p>&#x20B9;{ order.amount }.00</p>
                        <p>Items: { order.items.length }</p>
                        <p><span>&#x25cf;</span> <b>{ order.status }</b></p>
                        <button onClick={fetchOrders} >Track Order</button>
                    </div>
                )} ) 
            }
            </div>
        </div>
    )
}

export default MyOrders;