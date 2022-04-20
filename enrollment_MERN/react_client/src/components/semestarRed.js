import  React, {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFileCircleCheck, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from "../AuthContext";


const SemestarRed = ({student, showSub}) => {
    const { polozeno, upisani } = useContext(AuthContext);
    var tkn = (localStorage.getItem('token')).substring(1);
    var novi = tkn.substring(0, tkn.length - 1);
    const ad = 'Bearer' +' ' + novi;
   
    async function PassSubject(subjId){ 
        let newVal = {_id_sub:subjId, sub_status:"passed"};
        const requestOptions = {
            method: "PUT",
            headers: { "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                      "x-access-token": ad,
                      "withCredentials": true },
            body: JSON.stringify(newVal),     
        };
        const res = await fetch("http://localhost:8080/student/pass/" + student._id, requestOptions);
            const resJson = await res.json();
            var responseJson = resJson;
            window.location.reload(false);
            return console.log(responseJson);
    }

    async function DeleteSubject(idSub){ 
        const requestOptions = {
            method: "DELETE",
            headers: { "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                      "x-access-token": ad,
                      "withCredentials": true },
            body: JSON.stringify({_id_sub:idSub}),     
        };
        const res = await fetch("http://localhost:8080/student/remove/" + student._id, requestOptions);
            const resJson = await res.json();
            var responseJson = resJson;
            window.location.reload(false);
            return console.log(responseJson);
    }
console.log('polozeno ',polozeno);
console.log('upisano ',upisani);
    const semestar =["1","2","3","4","5","6"];
    return(
        <div className="upList">
      
            {semestar.map((sem)=>( 
                <table className="upisaniTable" key={sem}>
          
                <thead><tr><td>SEMESTAR {sem} <hr/></td></tr></thead> 
                <tbody className="upisanibody">
                    {showSub && showSub.map((subject) => (
                        subject.semestar_redovni == sem &&
                        <tr key={subject._id} value={subject._id}>
                                <td><strong>kod: </strong> ({subject.kod}) <br/> 
                                <strong> naziv: </strong> {subject.ime}
                               
                                
                            {polozeno && polozeno.map((passed)=>( passed._id_sub == subject._id ?
                                 <FontAwesomeIcon key={passed._id} icon={faFileCircleCheck}/>: null ))}
    
                            {upisani && upisani.map((enrolled)=>( enrolled._id_sub == subject._id && enrolled.sub_status=="enroll" ?
                                    <div key={enrolled._id}><a  onClick={() => PassSubject(subject._id)}> 
                                 <FontAwesomeIcon icon={faCircleCheck}/> </a> <a onClick={() => DeleteSubject(subject._id)}>
                                    <FontAwesomeIcon icon={faSquareMinus} />
                                </a></div>: null))}  
                            </td>
                       </tr> ))}
                </tbody>
         </table>
        ))}
        
    </div>  
    )
}



export default SemestarRed;