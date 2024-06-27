import React, { useState } from 'react';
import './header.css';

const Header = () => {
  const scrollToMenu = () => {
    const menuSection = document.querySelector('.explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Choose from our diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy you cravings and elevate your dining experience, one delicious meal at a time.</p>
            <button onClick={ scrollToMenu } >View Menu</button>
        </div>
    </div>
  )
}

export default Header;