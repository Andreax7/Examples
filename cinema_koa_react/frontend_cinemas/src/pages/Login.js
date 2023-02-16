import React, { useState } from "react"
import "../styles/login.css"
import { useNavigate } from 'react-router-dom'
import { Auth } from "../auth/Auth"
import {encode as base64_encode} from 'base-64'

export default function Login() {

  const auth = Auth();
  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errMessage, setErr ] = useState("")
  const navigate = useNavigate();


  const handleLogin = async e => {
    e.preventDefault();
    const data = { "name":name ,"password":password };  
    const requestOptions = {
              method: "POST",
              headers: {  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Access-Control-Allow-Origin": "*",
                        "content-type": "application/json",
                        "Accept": "application/json"
                      },
              body:JSON.stringify(data)
    }
      if(name === '' || password === ''){
        setErr('Empty fields');
      }
      else{
        await fetch("http://localhost:3001/login", requestOptions)
          .then(response => response.json())
          .then( res => {
            if(res.id === undefined ){  
                setErr('Wrong credentials');
              }
            else{
              const eUser = name + ':'+ password
              const encodedString = base64_encode(eUser)
              auth.login({auth: "Basic " + encodedString})
              localStorage.setItem('Basic ', encodedString);
              navigate("/user")
            }

          })
              
  }
}
  
    return (
      <div className="Login">
        <h2 id="lgHeader"> Login here </h2>
        <form id="loginForm" onSubmit={handleLogin}>
          <div id="name">
              <span>Username</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/><br/>
          </div>
          <div id="pass">
              <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
                <button type="submit" value="login" id="loginBTN">Login</button>
    
        </form>      
          <h2 id="err">{errMessage}</h2>
      </div>
    );
}
