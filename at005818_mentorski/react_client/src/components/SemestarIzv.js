import  React, {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faFileCircleCheck, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../AuthContext";


const SemestarIzv = ({student, showSub}) => {
    const { polozeno } = useContext(AuthContext);
    var tkn = (localStorage.getItem('token')).substring(1);
    var novi = tkn.substring(0, tkn.length - 1);
    const ad = 'Bearer' +' ' + novi;
   
    async function PassSubject(prop){ 
        let newVal = {_id_sub:prop, sub_status:"passed"};
        const requestOptions = {
            method: "POST",
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
            window.location.reload(true);
            return console.log(responseJson);
    }

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
        const res = await fetch("http://localhost:8080/student/remove/" + student._id, requestOptions);
            const resJson = await res.json();
            var responseJson = resJson;
            window.location.reload(true);
            return console.log(responseJson);
    }
   
    const semestar =["1","2","3","4","5","6","7","8"];
    return(
        <div className="upList">
      
            {semestar.map((sem)=>( 
                <table className="upisaniTable" key={sem}>
          
                <thead><tr><td>SEMESTAR {sem} <hr/></td></tr></thead> 
                <tbody className="upisanibody">
                    {showSub && showSub.map((subject) => (
                        subject.semestar_redovni == sem ?
                        <tr key={subject._id} value={subject._id}>
                                <td><strong>kod: </strong> ({subject.kod} ) <br/> 
                                <strong> naziv: </strong> {subject.ime}
                                <a onClick={() => DeleteSubject(subject._id)}>
                                    <FontAwesomeIcon icon={faSquareMinus} />
                                </a>
                             {polozeno && polozeno[0]._id_sub == subject._id ?
                             <a key={polozeno[0]._id_sub} disabled><FontAwesomeIcon icon={faFileCircleCheck}/> </a> : null }
                             {polozeno && polozeno[0]._id_sub != subject._id ?
                                <a onClick={() => PassSubject(subject._id)}><FontAwesomeIcon icon={faCircleCheck} /> </a> : null }
                                  
                             </td>
                       </tr> :<tr key={subject._id}></tr>))}
                </tbody>
         </table>
        ))}
        
    </div>  
    )
}



export default SemestarIzv;