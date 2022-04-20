import  React, { useEffect, useState } from "react";
import SemestarRed from "./semestarRed";
import SemestarIzv from "./semestarIzv";


const UpisaniSub = ({sviPredm, student, upisani}) => {
    const [showSub, setShow] = useState();
    
    
    useEffect(()=>{
        ListaUpisanih(sviPredm,upisani);
    },[upisani]);

    function ListaUpisanih (svi, up) {
        let res = [];
        res = svi.filter(el => {
            return up.find(element => {
                return element._id_sub===el._id;
             });
          });
          setShow(res);
          return res;
    }
   
    if (student.status == "redovni"){
        return(
                <SemestarRed student={student} showSub={showSub}/>
        )
    }
    if (student.status == "izvanredni"){
        return(
                <SemestarIzv student={student} showSub={showSub}/>
        )
    }
}


export default UpisaniSub;