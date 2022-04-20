import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

const Register =()=>{
  
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password2, setPassword2] = useState('');
    const [status, setStatus] = useState('');
    const [role, setRole] = useState('');
    const [error, errMessage] = useState('');
    const [val, setValidator] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
      console.log('role i st: ', role, status);
    },[role,status]);
 
  
    const signUp = e =>{
      errMessage('');
      e.preventDefault();
      
      if(status == '' || role == '' || password == '' || email =='')
             { console.log('data: ', email, role, status);
               return errMessage('Please fill mandatory fields'); }
      else{
        if(password != password2) 
            return errMessage('Passwords dont match'); 
        const data = { "email":email,"password":password, "status":status, "role":role };   
        const requestOptions = {
            method: "POST",
            headers: { "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                       },
            body: JSON.stringify(data)
        }; 
        fetch("http://localhost:8080/signup", requestOptions)
        .then((response) => {
                if(response.status == 400){
                  return errMessage('Something went wrong! ');
                }
                if(response.status == 201){
                  navigate("/login");
                  return errMessage(' Your account is created successfully !');
                }
            })
      }
    }

    function emailValid(e){
      setEmail(e);
      setValidator(validator.isEmail(e));
    }
  
    return(
      <>
        <div className="regForm">
          <h2 className="enrollment"> Enrollment System for University </h2>
              
          <h2 id="register"> Create Account </h2>
          <Link to="/login"><h2 id="login"> Login </h2></Link> 
          <div className="image">  
               <br/>
            </div>
           
            <form id="regFormContent" onSubmit={signUp}> 
           
                  <label> Email </label>
                    <input type="email" value={email} onChange={e => emailValid(e.target.value)} />
                      { val ? '': 'wrong email format'}
                    <br/>
                  <label> Password </label>    
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  <br/>
                  <label>  Repeat your password </label>
                      <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
                      {password != password2 ? 'Password dont match' : ''} 
                  <br/>
                  <label id="msg">  *set role first </label>
                  <br/>
                  <label>  Role </label>
                    <select multiple={false} value={role} onChange={e => setRole(e.target.value)}>
                        <option value="student" onClick={e => setRole(e.target.value)}>student</option>
                        <option value="mentor" onClick={e => setRole(e.target.value)}>mentor</option>
                    </select>
                  
                  <label> Status  </label>  
                    <select multiple={false} value={status} onChange={e => setStatus(e.target.value)}>
                        <option key="redovni" value="redovni" disabled={role=='' ? true : (role=="mentor" ? true : null)}>redovni</option>
                        <option key="izvanredni" value="izvanredni" disabled={role=='' ? true : (role=="mentor" ? true : null)}>izvanredni</option>
                        <option key="none" value="none" disabled={role=='' ? true : (role=="student" ? true : null)}>none</option>
                    </select>
                 <br/>
                 <h3 className="err">{error}</h3>
                  <button type='submit' id='rbtn'> Sign Up </button>
            </form>
        </div>
      </>
  
    );
  }

  export default Register;