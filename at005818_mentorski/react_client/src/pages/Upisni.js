import {useState, useContext, useEffect} from "react";
import jwt from 'jwt-decode'; // import dependency
import { AuthContext } from "../AuthContext";
import UpisaniStudent from "../components/upisaniStudent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Upisni = () => {

    const [error, errMessage] = useState('');
    const [ upisani, setUpisani ] = useState([]);
    const [ polozeno, setPolozeno ] = useState([]);
    const [ neupisani, setNeupisani ] = useState([]);
    const { allSub, setAll } = useContext(AuthContext);
    const [ UpisaniPrikaz, setPrikaz ] = useState([]);
    
    var tkn = (localStorage.getItem('token')).substring(1);
    const usr = (jwt(tkn));
    const uid = usr.id;

    var noviString = tkn.substring(0, tkn.length - 1);
    const ad = 'Bearer' +' ' + noviString;
    const requestOptions = {
        method: "GET",
        headers: { "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "x-access-token": ad,
                  "withCredentials": true },
        
    };   

    function sort(data, upisani){
        data.map((sub)=>{ 
            if(sub.sub_status=="enroll"){ 
                if(upisani != undefined){
                    upisani.filter(up => { if(sub._id_sub == up._id) return true; else return false}) ? console.log('predmet je već upisan') : setUpisani(upisani => [...upisani, sub]); }
                else setUpisani(upisani => [...upisani, sub]);
                }
            if(sub.sub_status=="passed"){
               
                if(polozeno == undefined){
                    polozeno.filter(pass => { if(sub._id_sub == pass._id)  return true; else return false}) ? console.log('predmet postoji u listi'): setPolozeno(pol => [...pol, sub]);
                }  
                else setPolozeno(pol => [...pol, sub]);
            }  
         
        });
    } 
    
    const getNeupisani = (upis, svi) => {
        let res = [];
        res = svi.filter(el => {
            return !upis.find(element => {
               return element._id_sub === el._id;
            });
         });
          setNeupisani(res);
         return res;
    }
    const getPrikaz = (enrolled, all) => {
        let arr = [];
        arr = all.filter(el => {
            return enrolled.find(element => {
               return element._id_sub === el._id;
            });
         });
          setPrikaz(arr);
         return arr;
    }

           async function getUpisani(){  // dohvaća niz polozenih i svih predmeta sa api-ja
            let path = "http://localhost:8080/student/"+ uid;
             await fetch("http://localhost:8080/subjects", requestOptions)
                 .then(resp => resp.json())
                     .then( allSub => {
                         setAll(allSub);
                          fetch(path, requestOptions)
                                 .then(res => res.json())
                                     .then( data => {
                                         setUpisani(data);
                                         sort(data,allSub); 
                                         getNeupisani(data,allSub);
                                         getPrikaz(data,allSub);
                                     })                            
                     })
                     .catch(err => {
                         console.log("Error Reading data " + err);
                     })
          };
     
         useEffect(()=>{
            getUpisani();         
             },[]);

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
                const res = await fetch("http://localhost:8080/student/" + uid, requestOptions);
                    const resJson = await res.json();
                    var responseJson = resJson;
                    window.location.reload(true);
                    return console.log(responseJson);
            }

if(neupisani && UpisaniPrikaz){
        return(  
            <div className="upisniComponent">
                <span>
                    <h3 id="naslov1">Predmeti </h3>
                    <h3 id="naslov2">Upisi {usr.email}</h3> 
                </span>
                <div className="neupisani">
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
                </div>
                  
                <div className="upisani">
                    <UpisaniStudent sviPredm={allSub} polozeno={polozeno} upisani={UpisaniPrikaz} student={usr}/>
                </div>
            </div>
        )
    }
}

export default Upisni;