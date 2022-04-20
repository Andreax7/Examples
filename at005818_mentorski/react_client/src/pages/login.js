import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'; // import dependency
import { AuthContext } from "../AuthContext";
import '../styles/login.css';
import validator from 'validator';

const Login =({setLog})=>{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, errMessage] = useState('');
  const { User, setUser } = useContext(AuthContext);
  const [val, setValidator] = useState(true);
  const navigate = useNavigate();

  const redirect = e =>{
    errMessage('');
    e.preventDefault();
    if(email == '' || password == '') {
      errMessage('Empty fields');
    }
    else{
      const data = { "email":email,"password":password };  
      const requestOptions = {
              method: "POST",
              headers: { "Access-Control-Allow-Origin": "*",
                       "Content-Type": "application/json",
                       "Accept": "application/json"
                      },
              body: JSON.stringify(data)
          }; 
      //console.log(data);
     fetch("http://localhost:8080/login/", requestOptions)
        .then((response) => response.json())
        .then((responseJson) =>{
          if(responseJson.token == undefined ){  
            errMessage('Wrong credentials');
          }
          if(responseJson.token != undefined){
            const jwtoken = responseJson.token;
            localStorage.setItem('token', JSON.stringify(jwtoken));
            var usr = jwt(jwtoken);
            setUser(usr);
            setLog(true);
            if(usr.role =='mentor')
              navigate("/studenti");
            if(usr.role =='student')
              navigate("/enroll");       
          }
        }); 
    } 
  }


  function emailValid(e){
    setEmail(e);
    setValidator(validator.isEmail(e));
  }
    return(
      <div className="content">
          <div className="loginComponent">
          <h2 className="enrollment"> Enrollment System for University </h2>
              <div className="loginForm">
                  <h2 className="login"> Login here</h2>
                  <Link to="/"><h2 id="back"> Back to register </h2></Link>
                <form id="loginForm" onSubmit={redirect}>
                    <label> Email 
                        <input type="email" value={email} onChange={(e) => emailValid(e.target.value)}/></label>  
                          <div className="emailError">
                            { val ? error : 'wrong email format'} 
                          </div> <br/>
                    <label> Password 
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> </label> 
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