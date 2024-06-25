import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [ cartItems, setCartItems ] = useState({});
    const url = "http://localhost:4000";
    const [ token, setToken ] = useState("");
    const [ food_list, setFoodList ] = useState([]);

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

    // nethod to fetch the food info from the DB
    const fetchFoodList = async () => {
        const res = await axios.get(url+"/api/v1/food/list");
        setFoodList(res.data.data); 
    }

    // method to keep us logged-in if the page is refreshed or till we logout
    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }

        loadData();
    }, [])

    // now using this context we can use this food_list anywhere. 
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            { props.children }
        </StoreContext.Provider>
    )
};

export default StoreContextProvider;