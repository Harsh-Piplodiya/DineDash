import React, { useContext, useEffect, useState } from 'react';
import './placeOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, url, frontendUrl, token, food_list, cartItems } = useContext(StoreContext);

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

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30
    }

    let response = await axios.post(url + "/api/v1/order/place", orderData, { headers: { Authorization: `Bearer ${token}` } });
    
    let orderId = response.data.data.order._id;
    // getting the api_key
    const { data: { key } } = await axios.get(url + "/api/v1/get");

    const options = {
      key,
      amount: response.data.data.razorpayOrder.amount,
      currency: "INR",
      name: "Harsh Piplodiya",
      description: "Test Transaction",
      image: "",
      order_id: response.data.data.razorpayOrder.id,
      // callback_url: `${url}/api/v1/order/verify`,
      handler: async function (response) {
        const verifyUrl = `${url}/api/v1/order/verifyPayment`;
        const paymentResponse = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
        };

        const result = await axios.post(verifyUrl, paymentResponse);
        console.log(result);

        let newUrl = "";
        if(result.status == 200){
          newUrl = `${frontendUrl}/verify?success=true&orderId=${orderId}`;
        } else {
          // newUrl = `http://localhost:5173/verify?success=false&orderId=${orderId}`;
          newUrl = `${frontendUrl}/verify?success=false&orderId=${orderId}`
        }
        
        window.location.href = `${newUrl}`;
      },
      prefill: {
          name: `${response.data.data.order.firstName} + ${response.data.data.order.lastName}`,
          email: response.data.data.order.email,
          contact: response.data.data.order.phone
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#141414"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate('/cart');
    } else if(getTotalCartAmount() === 0){
      navigate('/cart');
    }
  }, [token])
  
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
