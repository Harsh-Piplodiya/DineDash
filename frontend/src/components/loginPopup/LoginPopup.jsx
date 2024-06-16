import React, { useState } from 'react';
import './loginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
    const [ currentState, setCurrentState ] = useState("login"); 
  
    return (
    <div className='login-popup'>
        <form className='login-popup-container'>
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
                    :  <input type="text" placeholder='enter name' required />
                }
                <input type="email" placeholder='enter email' required />
                <input type="password" placeholder='enter password' required />
            </div>
            <button>{ currentState === "signup" ? "Create Account" : "Login" }</button>
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