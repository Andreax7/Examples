import  React, { useState, useEffect, useContext} from "react";
import { useParams } from 'react-router-dom';
import Predmet from "./Predmet";
import { AuthContext } from "../AuthContext";ž
import '../styles/predmeti.css';


const EditSub = () => {
  
   const [sub, setSub] = useState();
   const id = useParams().id;
   const {Subject, setSubject} = useContext(AuthContext);

   const tkn = (localStorage.getItem('token')).substring(1);
   var novi = tkn.substring(0, tkn.length - 1);
   const ad = 'Bearer' +' ' + novi;

    useEffect(()=>{
     getSubject();
 
     },[]);

  function getSubject(){
      fetch("http://localhost:8080/mentor/sub"+"/" + id,{
                     method: "GET",
                     headers: { "Access-Control-Allow-Origin": "*",
                                 "Content-Type": "application/json",
                                 "Accept": "application/json",
                                 "x-access-token": ad,
                                  "withCredentials": true },
      }) 
         .then((response) => response.json())
            .then((responseJson) => {
               setSub(responseJson);
               setSubject(responseJson[0]);
            });
  }
  

   return(
    <div className="row">
        { Subject && <Predmet/>}
    </div>
    )
}


export default EditSub;