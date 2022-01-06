import React, {useState, createContext} from "react"

export const CartContext = createContext();
    

export const CartProvider = (props) => {
    const [cartItems, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    return(
        <CartContext.Provider value={{cartItems, setCart ,total, setTotal}}>
           {props.children}
        </CartContext.Provider>
    )

}