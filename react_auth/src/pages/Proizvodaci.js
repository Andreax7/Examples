import React, {useState, useEffect} from "react"



const Proizvodaci = () =>{
    const [Producer, setProducer] = useState([]);

    async function getProizvodaci(){
        const res = await fetch(`http://localhost:8080/proizvodaci`);
        const resJson = await res.json();
        setProducer(resJson);
    }
    
    useEffect(() => {
        getProizvodaci();
      }, []);

  return(
        <div className="Choc">
          <h2> Proizvođači </h2>
        </div>
        
    );
};
    /* */
export default Proizvodaci;