import React from 'react'
import  '../styles/nav.css'
import { Link } from 'react-router-dom'
import Logo from '../static/logo.jpg';

export default function Navigation() {
    return (
        <nav>
            
            <ul><li>  <img src={Logo} alt="Split shows. logo"/></li>
             <li><Link to="/cinemas" className='nav-btn'>Cinemas</Link></li>
                <li><Link to="/projections"  className='nav-btn'>Projections</Link></li>
           </ul>
        </nav>   
        )
  }
  