import React, { useContext } from 'react';
import './foodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={ image } alt="" className="food-item-image" />
                
                {/* if itemCount is zero i.e. item has not been selected then the white add button will show which is the ass icon if that'll be the first order of that particular item and after adding 1 order of that item a new div consisting of 2 new icons with the itemCount in b/w will show. These buttons are the red & green in color, one for decreasing and the other for increasing the count of the item respectively. If the count hits 0 the white button will reappear indicating to add the item press the button. */}
                {
                    !cartItems[id]
                        ? <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add icon" />
                        : <div className="food-item-counter">
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove icon" />
                            <p>{ cartItems[id] }</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add icon" />
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