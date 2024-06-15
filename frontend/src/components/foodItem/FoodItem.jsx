import React, { useState } from 'react';
import './foodItem.css';
import { assets } from '../../assets/assets';

const FoodItem = ({ id, name, price, description, image }) => {
    const [ itemCount, setItemCount ] = useState(0);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={ image } alt="" className="food-item-image" />
                
                {/* if itemCount is zero i.e. item has not been selected then the white add button will show which is the ass icon if that'll be the first order of that particular item and after adding 1 order of that item a new div consisting of 2 new icons with the itemCount in b/w will show. These buttons are the red & green in color, one for decreasing and the other for increasing the count of the item respectively. If the count hits 0 the white button will reappear indicating to add the item press the button. */}
                {
                    !itemCount 
                        ? <img className="add" onClick={() => setItemCount(prev => prev+1)} src={assets.add_icon_white} alt="add icon" />
                        : <div className="food-item-counter">
                            <img onClick={() => setItemCount(prev => prev-1)} src={assets.remove_icon_red} alt="remove icon" />
                            <p>{ itemCount }</p>
                            <img onClick={() => setItemCount(prev => prev+1)} src={assets.add_icon_green} alt="add icon" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{ name }</p>
                    <img src={assets.rating_stars} alt="" />
                </div>
                <p className="food-item-desc">{ description }</p>
                <p className="food-item-price">${ price }</p>
            </div>
        </div>
    )
}

export default FoodItem;