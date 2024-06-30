import React from 'react';
import './footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.dineDash} alt="dineDash logo" />
                <p>DineDash brings the best local restaurants straight to your door. From your favorite comfort foods to exotic flavors, we have it all. Our mission is to deliver deliciousness with convenience and a pinch of dash.</p>
                <div className="footer-social-icons">
                    <a href="https://github.com/Harsh-Piplodiya" target='_blank' ><img src={assets.github_icon} alt="github" /></a>
                    <a href="https://www.linkedin.com/in/harsh-piplodiya-24266a234/" target='_blank' ><img src={assets.linkedin_icon} alt="linkedin" /></a>
                    <a href="https://twitter.com/harshp2910" target='_blank' ><img src={assets.twitter_icon} alt="twitter" /></a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-747-054-6777</li>
                    <li>harshpiplodiya29@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">&copy; 2024 DineDash created by Mast. Harsh Piplodiya. All Rights Reserved.</p>
    </div>
  )
}

export default Footer;