import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../AuthContext";
import { Link } from 'react-router-dom';
import '../styles/predmeti.css';
import { PortalModal } from '../components/PortalModal';
import '../styles/predmeti.css';

const AllSubs = () =>{
    
// settings for header get subjects    
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
    const [subj, setList] = useState();
    const {Subject} = useContext(AuthContext);

    function getAllSubjects(){
       fetch("http://localhost:8080/subjects", requestOptions)
       .then(res => res.json())
       .then( resp => setList(resp))
    };

    useEffect(()=>{
        getAllSubjects();

    },[Subject]);

// send new subj
    const [detail, setDetail] = useState(false);
    const [modal, setModal] = useState(false);
    const [inputs, setInput] = useState({});
    const [oneSub, setOne] = useState();
    const [getVal, setVal] = useState();
    const [message, setMsg] = useState('');
  

    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        console.log(name,value);   
        setInput(values =>({...values,[name]:value}));   
       
    }
    
    const submitForm = (event) =>{
        event.preventDefault();
        if(inputs.id==undefined || inputs.ime==undefined || inputs.program==undefined || inputs.kod==undefined || inputs.bodovi==undefined || inputs.izborni==undefined || inputs.semestar_redovni ==undefined || inputs.semestar_izvanredni==undefined){
            return setMsg('Empty fields');
        }
        else{
            newSub();
        } 
    }    
    
    function newSub(){  
        const requestOptions = {
            method: "POST",
            headers: { "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json",
                      "Accept": "application/json",
                      "x-access-token": ad,
                      "withCredentials": true
                       },
            body: JSON.stringify(inputs)
        };    
        fetch("http://localhost:8080/mentor/new_sub", requestOptions)
            .then(response => {
                response.json();
                if(response.status == 400){
                    return console.log(response);
                }
                if(response.status == 201){
                    window.location.reload(false);
                    return console.log(response);
                }
            })
    };

    const Change = () => setModal(!modal); // open/close modal

    return(
        <div className="predmeti_wrapper">
            
            <PortalModal show={modal} >   
                <div className="modalwindow">
                    <form id="newSubject"> 
                    <label> Id </label>
                        <input type="number" name="id" value={inputs.id || "unesi broj"} onChange={handleChange} />
                        <br/>
           
                    <label> Ime </label>
                        <input type="text" name="ime" value={inputs.ime || ""} onChange={handleChange} />
                        <br/>
                    <label> Kod </label>    
                        <input type="text" name="kod" value={inputs.kod || ""} onChange={handleChange} />
                    <br/>
                    <label> Program </label>
                        <input type="text" name="program" value={inputs.program || ""} onChange={handleChange} />
                    <br/>
                    <label> Bodovi </label>
                        <input type="number" name="bodovi" value={inputs.bodovi || ""} onChange={handleChange} />
                    <br/>
                    <label> Semestar redovni </label>
                        <input type="number" name="semestar_redovni" value={inputs.semestar_redovni || "unesi broj"} min="1" max="8" onChange={handleChange} />
                    <br/>
                    <label> Semestar izvanredni </label>
                        <input type="number" name="semestar_izvanredni" value={inputs.semestar_izvanredni || "unesi broj"} min="1" max="8" onChange={handleChange} />
                    <br/>
                    <label>  Izborni </label>
                        <select multiple={false} name="izborni" value={ inputs.izborni || ""} onChange={handleChange}>
                            <option disabled > </option>
                            <option value="ne" >ne</option>
                            <option value="da" >da</option>
                        </select>
                      
            </form>
                    <button className='btnModal2' onClick={submitForm}> spremi </button>
                     <div className="error">{message}</div>
                </div>                    
            </PortalModal> 
            
            <h3>Predmeti </h3>   

          
            {modal ?  <button className='btnModal2' onClick={Change}>  Zatvori  </button> :  <button className='btnModal2' onClick={Change}> Dodaj predmet </button>  }      
            {subj && 
            <table className="subList">
                <tbody className="subTable">
                    {subj.map((prop) => (
                        <tr className="row" key={prop._id}> 
                                <td value={prop._id} >
                                    
                                    <span> 
                                        <strong>kod:</strong> {prop.kod} <br/> 
                                        <strong>naziv: </strong>{prop.ime} <br/> 
                                        <strong>bodovi:</strong> {prop.bodovi} 
                                    </span>
                                    <li>
                                        <button value={prop._id} onClick={(e)=>{setVal(e.target.value);setOne(prop);setDetail(!detail);}}> Detalji </button> 
                                        <Link to={'/predmeti/'+ prop._id}> Uredi </Link>                                 
                                    </li><hr/>
                               { detail && (getVal == prop._id) ? <Text props={oneSub}/> : ''}  
                                </td>
                        </tr>
                  ))}</tbody>
            </table>  
         }</div>
    );
};

const Text = ({props}) =>{ 
    
    return(
        <div>
            <p> 
            <strong> program: </strong> {props.program}<br/>
            <strong>   izborni: </strong> {props.izborni}<br/>
            <strong> semestar izvanredni: </strong> {props.semestar_izvanredni}  <br/> 
            <strong> semestar redovni: </strong> {props.semestar_redovni}              
            </p>
            
        </div>
        )
};

export default AllSubs;