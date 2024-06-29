import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [ cartItems, setCartItems ] = useState({});
    // const url = "http://localhost:4000";
    const url = "https://dine-dash-black.vercel.app/";
    const [ token, setToken ] = useState("");
    const [ food_list, setFoodList ] = useState([]);

    const addToCart = async (itemId) => {
        const accessToken = localStorage.getItem('accessToken');
        // console.log("Access Token:", accessToken);
    
        if (token){
            if (!cartItems[itemId]) {
                setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            } else {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            }

            // calling the addToCart api to store the cart items of the user to the DB
            await axios.post(url + "/api/v1/cart/add", { itemId }, { headers: { Authorization: `Bearer ${accessToken}` } });
        } else {
            console.error("No access token found");
            alert("Please login to add items to your cart.")
        }
    };
    

    const removeFromCart = async (itemId) => {
        const accessToken = localStorage.getItem("accessToken");

        if(accessToken){
            setCartItems((prev) => ({...prev, [itemId] : prev[itemId] - 1}));

            // calling the remove from cart api to remove user's cart items from the DB as well
            await axios.post(url + "/api/v1/cart/remove", { itemId }, { headers: { Authorization: `Bearer ${accessToken}` } });
        } else {
            console.log("No access token found");
            alert("Please login to remove items from your cart.");
        }
    }

    // method to load user's cart data once he's logged in
    const loadCartData = async (token) => {
        const res = await axios.post(url + "/api/v1/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } });
        // console.log(res.data.data);
        setCartItems(res.data.data);
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

    // nethod to fetch the food info from the DB to display on the 'Top dishes near you'
    const fetchFoodList = async () => {
        const res = await axios.get(url + "/api/v1/food/list");
        setFoodList(res.data.data); 
    }

    // method to keep us logged-in if the page is refreshed or till we logout
    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("accessToken")){
                // console.log(localStorage.getItem("accessToken"));
                setToken(localStorage.getItem("accessToken"));
                await loadCartData(localStorage.getItem("accessToken"));
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