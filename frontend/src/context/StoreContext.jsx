import { createContext } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const contextValue = {food_list}; // now using this context we can use this food_list anywhere. 

    return (
        <StoreContext.Provider value={contextValue}>
            { props.children }
        </StoreContext.Provider>
    )
};

export default StoreContextProvider;