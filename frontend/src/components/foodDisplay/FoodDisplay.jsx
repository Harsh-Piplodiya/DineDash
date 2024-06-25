import React, { useContext } from 'react';
import './foodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../foodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    // using the context api we will access the food_list
    const { food_list } = useContext(StoreContext);
    // console.log(food_list);
  
    return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item, index) => {
                if(category === "all" || category === item.category){
                    return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image[0]} />
                }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay;