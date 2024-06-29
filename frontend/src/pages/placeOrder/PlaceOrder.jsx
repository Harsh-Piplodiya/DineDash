import React, { useContext, useState } from 'react';
import './placeOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, url, token, food_list, cartItems } = useContext(StoreContext);

  // responseId we will get after payment is done
  // we will get responseState after the payment is verified

  const [ data, setData ] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      phone: ""
    }
  );

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({...data, [name]: value}));
  }

  const checkoutHandler = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30
    }

    let response = await axios.post(url + "/api/v1/order/place", orderData, { headers: { Authorization: `Bearer ${token}` } });
    console.log(response);
  }
  
  return (
    <form onSubmit={ checkoutHandler } className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' required />
          <input name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' required />
        </div>
        <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email address' required />
        <input name='street' value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name='city' value={data.city} onChange={onChangeHandler} type="text" placeholder='City' required />
          <input name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='pincode' value={data.pincode} onChange={onChangeHandler} type="text" placeholder='Pincode' required />
          <input name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' required />
        </div>
        <input name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#x20B9;{ getTotalCartAmount() }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#x20B9;{ getTotalCartAmount() === 0 ? 0 : 30 }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#x20B9;{ getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30 }</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
