import React from 'react';
import { useState } from 'react';

import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/placeOrder' element={<PlaceOrder/>} />
        </Routes>
      </div>
  )
}

export default App;
