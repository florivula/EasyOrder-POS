import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import "./HomePage.css";

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
        <button><Link to="/signin" className='nav-link'> Log in</Link></button>
        <button><Link to="/signup" className='nav-link'> Sign up </Link></button>
     </div>
     <div className='section-container'>
     <button className='butoni'><Link to="" className='nav-link'> Point of Sale System </Link></button>
     <h1>EasyOrder.</h1>
     <p>User-friendly point-of-sale online platform designed exclusively for restaurants and cafes.</p>
     <span >
      <button className='btn'><Link to="/signup" className='nav-link'>Create Account </Link></button>
      <button className='btn2'><Link to="/usertable" className='nav-link'>Know More</Link></button>
     
       
     </span>
      
     </div>
     </div>
  )
}
