import {useState, useContext, useEffect} from "react";
import { useParams, useLocation } from 'react-router-dom';
import { AuthContext } from "../AuthContext";
import  SemestarIzv from "../components/semestarIzv";
import  SemestarRed from "../components/semestarRed";
import  NeupisaniSub from '../components/neupisaniSub';
import '../styles/mainMentor.css';

const UpisniMentor = () => {
    const { User, setNeupisani, polozeno, setPolozeno, upisani, setUpisani} = useContext(AuthContext);
    const [error, errMessage] = useState('');
    const [allSub, setAll] = useState([]);
    const [showSub, setShow] = useState();
    
    const location = useLocation();
    const { data } = location.state;  

    const id = useParams().id;
    const tkn = (localStorage.getItem('token')).substring(1);
    const novi = tkn.substring(0, tkn.length - 1);
    const ad = 'Bearer' +' ' + novi;
     
    const requestOptions = {
            method: "GET",
            headers: { "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "x-access-token": ad,
                    "withCredentials": true
                    }
        };
    
    async function getUpisani(){  // dohvaća niz polozenih i svih predmeta sa api-ja
       let path = "http://localhost:8080/mentor/students/"+id;
        await fetch("http://localhost:8080/subjects", requestOptions)
            .then(resp => resp.json())
                .then( allSub => {
                    setAll(allSub);
                     fetch(path, requestOptions)
                            .then(res => res.json())
                                .then( upList => {
                                    sort(upList); 
                                    getNeupisani(upList,allSub)
                                })                            
                })
                .catch(err => {
                    console.log("Error Reading data " + err);
                })
     };

    useEffect(()=>{
        getUpisani();         
        },[]);



    function sort(upList){
        upList.map((sub)=>{ 
            if(sub.sub_status=="enroll" || sub.sub_status=="passed"){ 
                if(upisani[0] != undefined){
                    upisani.filter(up => { if(sub._id == up._id) return true; else return false}) ? console.log('predmet je već upisan') : setUpisani(upisani => [...upisani, sub]);
                }
                else setUpisani(upisani => [...upisani, sub]);
            }  
            if(sub.sub_status=="passed"){
                if(polozeno && polozeno[0] != undefined){
                    polozeno.filter(pass => { if(sub._id == pass._id)  return true; else return false}) ? console.log('predmet postoji u listi'): setPolozeno(pol => [...pol, sub]);
                }  
                else setPolozeno(pol => [...pol, sub]);
            }
        });
    }

    const getNeupisani = (upList, sub) => {
        let res = [];
        res = sub.filter(el => {
            return !upList.find(element => {
               return element._id_sub === el._id;
            });
         });
          setNeupisani(res);
         return res;
    }

    useEffect(()=>{
        ListaUpisanih(upisani);
    },[upisani]);

    function ListaUpisanih(up) { 
        let res = [];
        res = allSub.filter(el => {
            return up.find(element => {
                return element._id_sub===el._id;
             });
          });
          setShow(res);
          return res;
        }

    /*function ListaUpisanih(up) { --vraća SAMO upisane -formatirano za prikaz
        let res = [];
        res = allSub.filter(el => {
            return up.find(element => {
                return element._id_sub===el._id;
             });
          });
          setShow(res);
          return res;
    }*/

    return(  
      
        <div className="upisniComponent">
            <span> <h2>  </h2> </span>
            <h3 id="naslov1">Predmeti </h3> 
            <h3 id="naslov2">Upisi {data.email}</h3> 
            <div className="neupisani">
                <NeupisaniSub />
            </div>
            
            <div className="upisani">
           { data.status=='redovni' && <SemestarRed student={data} showSub={showSub}/> }
           { data.status=='izvanredni' && <SemestarIzv student={data} showSub={showSub}/> }
            
            </div>
        </div>
   )
}
export default UpisniMentor;