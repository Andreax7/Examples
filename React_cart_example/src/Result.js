import React from "react";
import { Link } from 'react-router-dom';


const Result =({data}) =>{

    return(
        <div className="cajevi">
            <h3> Rezultati pretrage </h3>
                {data.map((caj) => ( 
                    <span id="caj" key={caj} value={caj} > 
                                {caj} 
                            <Link className="btnDet" to="/details" state={{ data: caj}}> 
                                detalji 
                            </Link>
                    
                    </span>
                ))} 
                
            <div>
           
            
           </div>
        </div>
    );
};
export default Result;