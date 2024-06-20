import React from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={ assets.dineDash } alt="dineDash logo" className="logo" />
        <img src={ assets.profile_image } alt="profile image" className="profile" />
    </div>
  )
}

export default Navbar;