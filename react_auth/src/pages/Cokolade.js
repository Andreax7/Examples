import React, { useEffect, useState } from "react"


const Cokolade = () =>{
    const [item, setItem] = useState([]);

    async function getAllChocs(){
        const res = await fetch(`http://localhost:8080/products`);
        console.log(res);
        const resJson = await res.json();
        setItem(resJson);
    }
    
    useEffect(() => {
        getAllChocs();
      }, []);
    
  // dohvaća podatke o kliknutom proizvodu 
  
  return( 
        <div className="Choc">
          <h2> Čokolade </h2>
       
        
        </div> /* lista s čokoladama s osnovnim info*/
        
    );
};
    /* */
export default Cokolade;