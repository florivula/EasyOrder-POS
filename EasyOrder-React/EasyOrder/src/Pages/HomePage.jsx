import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import "./HomePage.css";
import SignIn from "./SignIn"

export const HomePage = () => {
  return (
    <div className='hello'> 
    
     <div className="navbar">
     <ul>
        <li><NavLink to="#" className="nav-link" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink></li>
        <li><NavLink to="/services" className="nav-link" activeClassName="active">Services</NavLink></li>
        <li><NavLink to="/contacts" className="nav-link" activeClassName="active">Contacts</NavLink></li>
        <li><NavLink to="/pricing" className="nav-link" activeClassName="active">Pricing</NavLink></li>
      </ul>

        <button><Link to="" className='nav-link'> Log in / Sign up </Link></button>
     </div>
     <div className='section-container'>
     <button className='butoni'><Link to="" className='nav-link'> Point of Sale System </Link></button>
     <h1>EasyOrder.</h1>
     <p>User-friendly part-of-sale online platform design exclusively for restaurants and cafes.</p>
     <span >
      <button className='btn'><Link to="" className='nav-link'>Create Account </Link></button>
      <button className='btn2'><Link to="" className='nav-link'>Know More</Link></button>
     
       
     </span>
      
     </div>
     </div>
  )
}
