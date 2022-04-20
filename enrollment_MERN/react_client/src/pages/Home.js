import  React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import jwt from 'jwt-decode'; // import dependency
import { AuthProvider } from "../AuthContext";
import '../styles/Home.css';


import Login from "./Login";
import Register from "./register";
import AllSubs from "./AllSubs";
import Upisni from "./Upisni";
import UpisniMentor from "./UpisniMentor";
import Studenti from "./Studenti";
import EditSub from "./EditSub";


const Home = () => {
  const tokenString = localStorage.getItem('token');
  const u = tokenString ? jwt(tokenString) : false;
  const [loggedIn, setLog] = useState(tokenString ? true : false);  

  useEffect(()=>{
    
  },[loggedIn]);
  
 

  if(!loggedIn){
    return(
      <> <AuthProvider>
          <Router>
            <Routes>
                  <Route exact path="/" element={<Register />} />
                  <Route exact path="/login" element={<Login setLog={setLog}/>} />
                  <Route path="*" element={<Navigate to="/login"/>} />   
            </Routes> 
          </Router>
          </AuthProvider>
      </>
      );
    }
  if(loggedIn){
    if(u.role=='mentor'){
      return(
        <>
        <AuthProvider>
          <Router>
          <div className="nav">   
                <ul><li><Link to="/predmeti"> Predmeti </Link></li> </ul>
                <ul><li><Link to="/studenti"> Studenti </Link></li> </ul>
                <ul><li><a onClick={logout=>{localStorage.clear(); window.location.href = '/login'}}> Logout </a></li> </ul>
          </div>
        
            <Routes> 
                <Route path="/predmeti" element={<AllSubs />} />
                  <Route exact path="/predmeti/:id" element={<EditSub />}/>
                <Route exact path="/studenti" element={<Studenti />}/>
                  <Route exact path="/studenti/:id" element={<UpisniMentor />}/>
                <Route path="*" element={<Navigate to="/predmeti"/>} />        
            </Routes>  
  
          </Router>   
        </AuthProvider>
        </>
      );
    }

    if(u.role=='student'){
      return(
          <> 
          <AuthProvider>
            <div className="nav">
              <ul><li><a onClick={logout=>{localStorage.clear(); window.location.href = '/login';}}> Logout </a></li> </ul>
            </div>
            <Router>
              <Routes>
                <Route exact path="/enroll" element={<Upisni/>} /> 
                <Route path="*" element={<Navigate to="/enroll" />} />
              </Routes> 
            </Router> 
            </AuthProvider>
      </>
      );
    }
  }
   
};


export default Home;
