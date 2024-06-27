import React, { useContext, useEffect, useState } from 'react';
import './loginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
    
    const { url, setToken } = useContext(StoreContext);
    const [ currentState, setCurrentState ] = useState("login");
    const [ data, setData ] = useState(
        {
            name: "",
            email: "",
            password: ""
        }
    );

    // whenever some change occurs in the login form the data will be updated using this onChnageHandler
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({...data, [name]: value}));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if(currentState === "login") {
            newUrl += "/api/v1/user/login";
        } else {
            newUrl += "/api/v1/user/register";
        }
    
        try {
            // Calling the API
            const res = await axios.post(newUrl, data);
            // console.log('Response Data:', res.data);
    
            if(res.data.success) {
                // Set tokens in state/context and localStorage
                setToken(res.data.data.accessToken);
                localStorage.setItem("accessToken", res.data.data.accessToken);
                // localStorage.setItem("refreshToken", res.data.data.refreshToken);
                
                // Once the user is logged in, hide the login page
                setShowLogin(false);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            // console.error('Error logging in:', error);
            alert('Failed to login. Please try again.');
        }
    }
    

  
    return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>
                    { 
                        currentState === "login"
                        ? "Login"
                        : "Sign up"
                    }
                </h2>
                <img onClick={() => setShowLogin(false)} src={ assets.cross_icon } alt="close the tab" />
            </div>
            <div className="login-popup-inputs">
                {/* if the user wanna sign up than the name of the user will be asked else the name input field will be hidden. */}
                { 
                    currentState === "login" 
                    ? <></> 
                    :  <input name='name' value={data.name} onChange={onChangeHandler} type="text" placeholder='enter name' required />
                }
                <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='enter email' required />
                <input name='password' value={data.password} onChange={onChangeHandler} type="password" placeholder='enter password' required />
            </div>
            <button type='submit' >{ currentState === "signup" ? "Create Account" : "Login" }</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By countinuing, i agree to the terms of use & privacy policy.</p>
            </div>
            { 
                currentState === "login"
                ? <p>Create a new account? <span onClick={() => setCurrentState("signup")}>Click here</span></p>
                : <p>Already have an account? <span onClick={() => setCurrentState("login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup;