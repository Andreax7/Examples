import React, {useState, useEffect} from "react"
import { CartContext } from "./CartContext"
import { Link } from "react-router-dom";
import { PortalModal } from "./PortalModal";


const Logout =({setLog})=>{
 
  useEffect(()=>{
    console.log('logged in: ', loggedIn);
  }, [loggedIn]);
  

    return(
      <div className="modal">
      </div>
  
    );
  }

export default Logout;