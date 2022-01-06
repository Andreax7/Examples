import React, {useState, useContext, useEffect} from "react";
import { CartContext } from "./CartContext";

const Nav = () =>{
    const value = useContext(CartContext);
    const {cartItems, setCart} = useContext(CartContext);
    const {total, setTotal}  = useContext(CartContext);
    

    return(
        <div id= "stanje">
            <h3>cajevi u košarici: {cartItems.length} </h3>
            <h3>iznos: {total} HRK</h3>
        </div>
    )
}
export default Nav;