import React, {useState, useEffect} from "react";

import { useNavigate, Route, NavLink, Link } from "react-router-dom";



const Login =({setToken})=>{


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, errMessage] = useState('');


  const OnSubmit = e => {
    errMessage('');
    e.preventDefault();
    if(username == '' || password == '') errMessage('Empty fields');
    else{
      const data = { "username":username,"password":password };  
         const requestOptions = {
          method: "POST",
          headers: { "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                     },
          body: JSON.stringify(data)
        }; 
      //console.log(data);
      fetch("http://localhost:8080/login", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.token != undefined){
          const jwtoken = responseJson.token;
          localStorage.setItem('token', JSON.stringify(jwtoken));
          setToken(jwtoken);     
        } 
        else {
          errMessage('Wrong credentials');
          setToken(false); 
            }
        return responseJson;
      }); 
    }
  }
    return(
      <div className="content">
          <div className="loginComponent">
              <div className="loginForm">
                  <img id="Logo" src={require('../../logo.png')}/> 
                  <h2 className="login"> Login here</h2>
                  <Link to="/"><h2 id="back"> Back to register </h2></Link>
                <form id="loginForm" onSubmit={OnSubmit}>
                    <label> Username 
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/></label>  
                                    <div className="usernameError"></div> <br/>
                    <label> Password 
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} /> </label> 
                    <div className="PasswordError">
                     {error}
                    </div>
                    <button type="submit" value="login" id="lbtn">Login</button>
                </form>
              </div>
          </div>    
      </div>
  
    );
  }

export default Login;