import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Navbar = ({ setShowLogin }) => {

    const [ menu, setMenu ] = useState("home");
    const { getTotalCartAmount, token, setToken, url } = useContext(StoreContext);

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("accessToken");
        setToken("");

        // after removing the token we'll move the user to the home page
        navigate("/");
    }

    return (
    <div className='navbar'>
        <Link to="/"><img src={ assets.dineDash } alt="dineDash logo" className='logo' /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
            <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
            <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
            <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
        </ul>

        <div className='navbar-right'>
            <img src={ assets.search_icon } alt="search icon" />
            <div className="navbar-basket-icon">    
                {/* <a href="/cart"><img src={ assets.basket_icon } alt="cart icon" /></a> */}
                <Link to="/cart"><img src={ assets.basket_icon } alt="cart icon" /></Link>
                <div className={ getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            {
                !token
                ? <button onClick={() => setShowLogin(true)} >Sign In</button>
                : <div className='navbar-profile'>
                    <img src={ assets.profile_icon } alt="profile icon" />
                    <ul className="nav-profile-dropdown">
                        <li><img src={ assets.bag_icon } alt="bag icon" /><p>Orders</p></li>
                        <hr />
                        <li onClick={logout} ><img src={ assets.logout_icon } alt="logout icon" /><p>Logout</p></li>
                    </ul>
                </div> 
            }
            
        </div>
    </div>
    )
}

export default Navbar;