import React from 'react'
import "./styles/App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navigation from './components/Navigation'
import Login from './pages/Login'
import Register from './pages/Register'
import Cinemas from './pages/Cinemas'
import Projections from './pages/Projections'
import AdminPanel from './pages/AdminPanel'

import { RequireAuth } from "./auth/RequireAuth"
import { AuthProvider } from "./auth/Auth"
  
export default function App() {
 
 
  return (
    <div className="App">  
      <div className="main">
     
      <BrowserRouter> 
     
        <Navigation/>

        <AuthProvider>
            <Routes>
            <Route>
              <Route  path="/cinemas" index element={<Cinemas />} />
              <Route  path="/projections" index element={<Projections />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user" element={ <RequireAuth>
                                              <AdminPanel />
                                            </RequireAuth>} />
              <Route path="*" element={<Cinemas />} />
            </Route>
          </Routes>

        </AuthProvider>
  
    </BrowserRouter>

      </div>
    </div>
  );
}
