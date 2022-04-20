import React, {useState, createContext, useEffect} from "react";
import jwt from 'jwt-decode'; // import dependency

export const AuthContext = createContext();
    
export const AuthProvider = (props) => {
    var [User, setUser] = useState();
    var [Subject, setSubject] = useState();
    const [allSub, setAll] = useState([]);
    const [neupisani, setNeupisani] = useState([]);
    const [polozeno, setPolozeno] = useState([]);
    const [ upisani, setUpisani] = useState([]);
   

    const tokenString = localStorage.getItem('token');

    useEffect(()=>{
        if(tokenString){
            setUser(jwt(tokenString)); //if refresh
      }
      }, [tokenString]);
     
    return(

        <AuthContext.Provider value={{  User, setUser,allSub, setAll, Subject, setSubject, polozeno, setPolozeno, upisani, setUpisani, neupisani, setNeupisani}}>
           {props.children}
        </AuthContext.Provider>
        
    )

}