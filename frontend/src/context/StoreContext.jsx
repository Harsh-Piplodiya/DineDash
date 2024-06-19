import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [ cartItems, setCartItems ] = useState({});

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            // this will create a new entry for our food item if that product ID is not avail. in the cart.
            setCartItems((prev) => ({...prev, [itemId] : 1}));
        } else {
            setCartItems((prev) => ({...prev, [itemId] : prev[itemId] + 1}));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] - 1}));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    // now using this context we can use this food_list anywhere. 
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            { props.children }
        </StoreContext.Provider>
    )
};

export default StoreContextProvider;