import {useEffect,useContext, useState} from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../AuthContext";
import '../styles/mainMentor.css';

const Studenti = () =>{
    var tkn = (localStorage.getItem('token')).substring(1);
    var novi = tkn.substring(0, tkn.length - 1);
    const ad = 'Bearer' +' ' + novi;
    const requestOptions = {
        method: "GET",
        headers: { "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "x-access-token": ad,
                  "withCredentials": true
                   },
    };

    
    const [stu, setList] = useState();
    const [redovni, setRed] = useState([]);
    const [izv, setIzv] = useState([]);
        
    async function getAllStudents(){
        const res = await fetch("http://localhost:8080/mentor/students", requestOptions);
        const resJson = await res.json();
        var responseJson = resJson;
        setList(responseJson);
        getStatus(responseJson);
      }

    function getStatus(data){
        data.map((s)=>{ 
            if(s.status=="redovni"){ 
                if(redovni[0] != undefined){
                    redovni.filter(red => { if(s._id == red._id) return true; else return false}) ? console.log('redovni postoji') : setRed(redovni => [...redovni, s]);
                }
                else setRed(redovni => [...redovni, s]);
            }  
            if(s.status=="izvanredni"){
                if(izv[0] != undefined){
                    izv.filter(iz => { if(s._id == iz._id)  return true; else return false}) ? console.log('izv postoji'): setIzv(izv => [...izv, s]);
                }  
               else setIzv(izv => [...izv, s]);
            }
        });
    }

    useEffect(()=>{
        getAllStudents();
    },[]);

    
    return(
        <div className="studentiComp">
            <h3>Studenti </h3>
            <span id="header1"> Redovni </span>
            <div className="StudentList">
                {stu && redovni.map((p) => (  
                    <ul key={p._id}>
                        <li value={p._id}>
                            {p.email}
                            <Link to={'/studenti/'+ p._id} state={{ data: p}} > 
                                detalji 
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
            <span id="header2"> Izvanredni </span>
            <div className="StudentList2">
                {stu && <>{ izv && izv.map((iz) => (  
                    <ul key={iz._id}>
                        <li value={iz._id}>
                            {iz.email}
                            <Link to={'/studenti/'+ iz._id} state={{ data: iz}}> 
                                detalji 
                            </Link>
                        </li>
                    </ul>
                ))}</> }
            </div>
        </div>
    )
}
export default Studenti;