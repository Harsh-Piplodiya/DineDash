import { useState } from 'react';;
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/add/Add';
import List from './pages/list/List';
import Orders from './pages/orders/Orders';

function App() {
  

  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
