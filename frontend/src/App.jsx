import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Verify from './pages/verify/Verify';
import Footer from './components/footer/Footer';
import LoginPopup from './components/loginPopup/LoginPopup';
import MyOrders from './pages/myOrders/MyOrders';

function App() {
  const [ showLogin, setShowLogin ] = useState(false);

  return (
      <>
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <div className='app'>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/myorders' element={<MyOrders />} />
          </Routes>
        </div>
        <Footer />
      </>
  )
}

export default App;
