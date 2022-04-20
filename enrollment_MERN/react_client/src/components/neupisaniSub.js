import  React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../AuthContext";

const NeupisaniSub = () => {
    const { User, neupisani } = useContext(AuthContext);
    const subId = useParams().id ? useParams().id : User.id;
    var tkn = (localStorage.getItem('token')).substring(1);
    var novi = tkn.substring(0, tkn.length - 1);
    const ad = 'Bearer' +' ' + novi;
    
    async function EnrollSubject(prop){ 
        let newVal = {_id_sub:prop, sub_status:"enroll"};
        const requestOptions = {
            method: "POST",
            headers: { "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                      "x-access-token": ad,
                      "withCredentials": true },
            body: JSON.stringify(newVal),     
        };
        const res = await fetch("http://localhost:8080/student/" + subId, requestOptions);
            const resJson = await res.json();
            var responseJson = resJson;
            window.location.reload(true);
            return console.log(responseJson);
    }


    return(
        <table className="subList">
            <tbody className="subTable">
                {neupisani.map((prop) => (
                    <tr className="row" key={prop._id}> 
                        <td value={prop._id} >
                            <span> 
                            <strong>kod:</strong> {prop.kod} <br/> 
                             <strong>naziv: </strong> {prop.ime} 
                             <a onClick={()=>EnrollSubject(prop._id)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                             </a>  
                            </span>
                               <hr/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>  
    )
}



export default NeupisaniSub;