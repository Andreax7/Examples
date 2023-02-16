import React, { useState } from "react"
import "../styles/login.css"
import { useNavigate } from 'react-router-dom'

export default function Register() {
  
  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("")
  const [ password2, setPassword2 ] = useState("")
  const [errMessage, setErr ] = useState("")
  const navigate = useNavigate();

  const handleRegister = async e => {
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
      if(name === '' || password === '' || password2 ===''){
        setErr('Empty fields');
      }
      if(password !== password2){
        setErr('Passwords Not Matching');
      }
      else{
        await fetch("http://localhost:3001/signup", requestOptions)
          .then(response => response.json())
          .then( res => {
            console.log('HERE ',typeof res)
            if(res === undefined ){  
                setErr('Wrong credentials');
              }
            else{
              navigate("/login")
            }
          }).catch(err => {
            setErr('User exists');
            console.log(err)
          })
              
  }
}
  
    return (
      <div className="Login">
        <h2 id="lgHeader"> Register here </h2>
        <form id="regForm" onSubmit={handleRegister}>
          <div id="name">
              <span>Username</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/><br/>
          </div>
          <div id="pass">
              <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div id="pass">
              <span>Repeat Password</span>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                {password !== password2 ? 'Password dont match' : ''} 
          </div>
                <button type="submit" value="signup" id="signupBTN">Register</button>
    
        </form>      
          <h2 id="err">{errMessage}</h2>
      </div>
    );
}