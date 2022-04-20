import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Cokolade from "./pages/Cokolade";
import Proizvodaci from "./pages/Proizvodaci";

import Login from "./pages/Login";
import validator from 'validator';

const App = () => {

  const [jwtoken, setToken] = useState();
  const [loggedIn, setLog] = useState();

  useEffect(()=>{
    const tokenString = localStorage.getItem('token');
    tokenString ? setLog(true) : setLog(false);
    console.log(tokenString); 
   
  }, [jwtoken]);

  console.log('logged in: ', loggedIn);
  
  const handleLogout = () => {
    localStorage.clear();
    setLog(false);
  }

    return(
    <>
      { !loggedIn && (
        <Router>
          <Routes>
                <Route exact path="/" element={<Register />} />
                <Route exact path="/login" element={<Login setToken={setToken}/>} />
          </Routes> 
        </Router>
      )}
      {loggedIn && (
      <CartProvider>
        <Stanje/>
        <Router>
          <Routes>
                <Route exact path="/products" element={<Cokolade />} />
                <Route exact path="/producers" element={<Proizvodaci />} />
              { <Route exact path="/cart" element={<Cart />} />}
          </Routes> 
              
          <div className="nav">
              <ul><li><Link to="/products"> Products </Link></li> </ul>
              <ul><li><Link to="/producers"> Producers </Link></li> </ul>
              <ul><li><Link to="/cart"> Cart </Link> </li>  </ul>
              <ul><li> <Link to="/login" onClick={handleLogout}>   Logout  </Link>  </li> </ul>
          </div>
        </Router>
      </CartProvider>     
      )}
    </>    

      
    );
};



const Register =()=>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('user');
  const [error, errMessage] = useState('');
  const [val, setValidator] = useState(true);


  const signUp = e =>{
    errMessage('');
    e.preventDefault();
    if(username == '' || password == '' || email =='') return errMessage('Please fill mandatory fields');
    else{
      if(password != password2) return errMessage('Passwords dont match'); 
      const data = { "username":username,"password":password,"email":email,"lastName":lastName,"firstName":firstName, "address":address, role:role };  
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
                  errMessage(' Your account is created successfully !')
              }
          })
    }
  }

  return(
    <div className="registerComponent">
      <div className="regForm">
      <img id="regLogo" src={require('../logo.png')}/> 
        <h2 id="register"> Create Account </h2>
        <Link to="/login"><h2 id="login"> Login </h2></Link>
        <h3 className="err">{error}</h3><br/>
          <form id="regFormContent" onSubmit={signUp}>
          <label>
               Username
               <input type="text" value={username} onChange={e => setUsername(e.target.value) }/>
          </label> <br/>
                <label> 
                    Password
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label><br/>
                <label> 
                    Repeat your password
                    <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
                    {password != password2 ? 'Password dont match' : ''} 
                </label><br/>
                
                <label> 
                  Email
                  <input type="email" value={email} onChange={e => {setEmail(e.target.value); setValidator(validator.isEmail(email))}} />
                  { val ? '': 'wrong email format'}
                </label><br/>
                <label> 
                  First name
                  <input type="text" value={firstName} onChange={e => setfirstName(e.target.value)}/>
                </label><br/>
                <label> 
                  Last name 
                  <input type="text" value={lastName} onChange={e => setlastName(e.target.value)}/>
                </label><br/>
                <label> 
                  Address 
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
                </label><br/>
                <label> 
                  Role 
                  <input type="text" value={role} onChange={e => setRole(e.target.value)}/>
                </label>
                <button type='submit' id='rbtn'> Sign Up </button>
          </form>
      </div>
    </div>

  );
}


render(<App />, document.getElementById("root"));
