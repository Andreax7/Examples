import React, {useEffect, useContext, useState} from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom';
import '../styles/predmeti.css';

const Predmet=() =>{

    const {Subject, setSubject} = useContext(AuthContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const id = useParams().id;

    var tkn = (localStorage.getItem('token')).substring(1);
    var novi = tkn.substring(0, tkn.length - 1);
    const ad = 'Bearer' +' ' + novi;
    const requestOptions = {
        method: "POST",
        headers: { "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "x-access-token": ad,
                  "withCredentials": true },
        body: JSON.stringify(Subject),     
    };

    async function updateSubject(){
        try{
            const res = await fetch("http://localhost:8080/mentor/" + id, requestOptions);
            const resJson = await res.json();
            var responseJson = resJson;
            navigate("/predmeti");
            return console.log(responseJson);
        }
        catch(err){
            setError(true);
            console.log(err);
        }
    }
   
    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        console.log('change ',name,value);
        setSubject(newvalues =>({...newvalues,[name]:value}));
    }
    const Odustani = (e) =>{
        e.preventDefault();
        navigate("/predmeti");
    }
    const SaveSub = (e) =>{
        e.preventDefault();
        console.log(Subject);  
        updateSubject();    
    }
      return( 
    <>{Subject &&  
       <div className="PredmetiComp">
   
         <h3>Uredi predmet </h3>
       
                <form key="form" id="newSubject"> 
                    <div className="formBody">
                        <label> Id </label>
                            <input type="number" name="id" key="id" value={Subject.id} onChange={handleChange} />
                            <br/>
            
                        <label> Ime </label>
                            <input type="text" name="ime" key="ime" value={Subject.ime} onChange={handleChange} />
                            <br/>
                        <label> Kod </label>    
                            <input type="text" name="kod" key="kod" value={Subject.kod} onChange={handleChange} />
                        <br/>
                        <label> Program </label>
                            <input type="text" name="program" key="program" value={Subject.program} onChange={handleChange} />
                        <br/>
                        <label> Bodovi </label>
                            <input type="number" name="bodovi" key="bodovi" value={Subject.bodovi} onChange={handleChange} />
                        <br/>
                        <label> Semestar redovni </label>
                            <input type="number" name="semestar_redovni" key="semestar_redovni" value={Subject.semestar_redovni} min="1" max="8" onChange={handleChange} />
                        <br/>
                        <label> Semestar izvanredni </label>
                            <input type="number" name="semestar_izvanredni" key="semestar_izvanredni" value={Subject.semestar_izvanredni} min="1" max="8" onChange={handleChange} />
                        <br/>
                        <label>  Izborni </label>
                            <select multiple={false} name="izborni" key="izborni" value={ Subject.izborni} onChange={handleChange}>
                                <option key="opt1" disabled > </option>
                                <option key="opt2" value="ne" >ne</option>
                                <option key="opt3" value="da" >da</option>
                            </select>     
                    </div>      
                </form>
         <button className='edit1' onClick={Odustani}>  Odustani  </button> 
        <button className='edit2' onClick={SaveSub}>  Spremi  </button> 

        {error ? <p className="error"> Something went wrong! </p> : ''  }
        </div>
   } </> )

}
export default Predmet;