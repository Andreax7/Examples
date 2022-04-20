import  React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFileCircleCheck, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import jwt from 'jwt-decode'; // import dependency

const upisaniStudent = ({sviPredm, student, upisani, polozeno}) => {
    
    useEffect(()=>{
    },[upisani]);



    var tkn = (localStorage.getItem('token')).substring(1);
    const usr = (jwt(tkn));
    const uid = usr.id;

    var noviString = tkn.substring(0, tkn.length - 1);//Header settings
    const ad = 'Bearer' +' ' + noviString;
   
    async function DeleteSubject(prop){ 
        const requestOptions = {
            method: "DELETE",
            headers: { "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                      "x-access-token": ad,
                      "withCredentials": true },
            body: JSON.stringify({_id_sub:prop}),     
        };
       
        const res = await fetch("http://localhost:8080/student/remove/" + uid, requestOptions);
            const resJson = await res.json();
            var responseJson = resJson;
            window.location.reload(true);
            return console.log(responseJson);
    }
       const semestarRed =["1","2","3","4","5","6"];
       const semestarIzv =["1","2","3","4","5","6","7","8"];

 console.log('sub', upisani); 
    if (student.status == "redovni" ){
        return(
                <div className="upList">
              
                    {semestarRed.map((sem)=>( 
                        <table className="upisaniTable" key={sem}>
                  
                        <thead><tr><td>SEMESTAR {sem} <hr/></td></tr></thead> 
                        <tbody className="upisanibody">
                            {upisani && upisani.map((subject) => (
                                subject.semestar_redovni == sem &&
                                <tr key={subject._id} value={subject._id}>
                                        <td><strong>kod: </strong> ({subject.kod}) <br/> 
                                        <strong> naziv: </strong> {subject.ime}
                                    
                                        {polozeno && polozeno.map((passed)=>( passed._id_sub == subject._id ?
                                         <FontAwesomeIcon key={passed._id} icon={faFileCircleCheck}/>: <a onClick={() => DeleteSubject(subject._id)}>
                                            <FontAwesomeIcon icon={faSquareMinus} />
                                        </a> ))}
                     
                                     </td>
                               </tr> ))}
                        </tbody>
                 </table>
                ))}
                
            </div>  
            )
    }
    if (student.status == "izvanredni"){
        return(
                <div className="upList">
              
                    {semestarIzv.map((sem)=>( 
                        <table className="upisaniTable" key={sem}>
                  
                        <thead><tr><td>SEMESTAR {sem} <hr/></td></tr></thead> 
                        <tbody className="upisanibody">
                            {upisani && upisani.map((subject) => (
                                (subject.semestar_redovni == sem) &&
                                <tr key={subject._id} value={subject._id}>
                                        <td><strong>kod: </strong> ({subject.kod}) <br/> 
                                        <strong> naziv: </strong> {subject.ime}
                                         <a onClick={() => DeleteSubject(subject._id)}>
                                            <FontAwesomeIcon icon={faSquareMinus} />
                                        </a>
                     
                                     </td>
                               </tr> ))}
                        </tbody>
                 </table>
                ))}
                
            </div>  
            )
    }

}


export default upisaniStudent;