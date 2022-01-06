import React, {useContext, useEffect} from "react"
import { CartContext } from "./CartContext"


const Cart = () =>{
  const {cartItems, setCart} = useContext(CartContext);
  const {total, setTotal}  = useContext(CartContext);
  
  return(
        <div className="Cart">
          <h2> Košarica </h2>
         <span className="spanCart"> broj čajeva u košarici : {cartItems.length} </span> <br />
         <span className="spanCart"> ukupan iznos: {total} HRK</span> <br />
         
         <br />
          <div className="ListaCart">
            <span id="lista"> Lista odabranih cajeva </span>
                {cartItems.map((caj) => ( 
                  <span className="listaCaj" id="caj" key={caj} value={caj[0]} > 
                                    naziv:  {caj[0]} <br/><br/>
                                    cijena: {caj[1]*caj[2]} HRK <br/><br/>
                                    kolicina: {caj[2]}
                  </span> 
                ))}
          </div>
        </div>
        
    );
};
    /* */
export default Cart;