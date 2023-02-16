import React from "react"
import { Navigate } from "react-router-dom"

export const RequireAuth = ({ children }) => { 
    const userDecoded = localStorage.getItem('Basic ');
    console.log('req auth ', userDecoded )
    return userDecoded ? (children) : (<Navigate to="/"/> );
};