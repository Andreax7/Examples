import  { React, useContext, useEffect} from "react";
import {render}  from "react-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import {setConfig} from 'react-hot-loader';

setConfig({disableHotRenderer: true});

const App = () => {

   return(
    <AuthProvider>
         <Home/>
    </AuthProvider>
    )
}


render(<App/>,document.getElementById("root"));