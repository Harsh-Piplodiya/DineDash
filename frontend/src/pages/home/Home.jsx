import React, { useState } from 'react';
import './home.css';
import Header from '../../components/header/Header';
import ExploreMenu from '../../components/exploreMenu/ExploreMenu';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';

const Home = () => {
  const [ category, setCategory ] = useState("all");
  
    return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
    </div>
  )
}

export default Home;