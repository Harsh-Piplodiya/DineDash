import React from 'react';
import './orders.css';
import { url, assets } from '../../assets/assets';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Orders = () => {
  const [ orders, setOrders ] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/v1/order/listorders");
    console.log(response);
    if(response.data.success){
      setOrders(response.data.data);
    } else {
      toast.error("Some error occured.");
    }
  }

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/v1/order/updatestatus", {
      orderId,
      status: e.target.value
    });

    if(response.data.success){
      await fetchAllOrders();
    }
  } 

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        { orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel icon" />
              <div>
                <p className='order-item-food'>
                  { order.items.map((item, itemIndex) => {
                    if(itemIndex === order.items.length - 1){
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  }) }
                </p>
                <p className="order-item-name">{ order.address.firstName + " " + order.address.lastName }</p>
                <div className="order-item-address">
                  <p>{ order.address.street + ", " }</p>
                  <p>
                    { order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.pincode }
                  </p>
                </div>
                <p className="order-item-phone">{ order.address.phone }</p>
              </div>
              <p>Item: { order.items.length }</p>
              <p>&#x20B9;{ order.amount }</p>
              <select onChange={(e) => statusHandler(e, order._id)} value={ order.status } >
                <option value="Food Processing...">Food Processing...</option>
                <option value="Out for Delivery!😋">Out for Delivery!😋</option>
                <option value="Delivered😇">Delivered😇</option>
              </select>
            </div>
          );
        }) }
      </div>
    </div>
  );
  
}

export default Orders;