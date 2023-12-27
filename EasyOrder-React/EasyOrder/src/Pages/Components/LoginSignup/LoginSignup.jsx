import React from 'react'
import './LoginSignup.css'
import user_icon from '../Images/person.png'
import email_icon from '../Images/email.png';
import password_icon from '../Images/password.png';
import {useState} from 'react';



const LoginSignup = () => {

    const [action,setAction] = useState('Login');
  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">

        {action ==='Login'?<div></div>:<div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder='Name' required/>
        </div>}
        
        <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder='Email' required/>
        </div>
        <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Password' required />
        </div>
      </div>

      {action ==='Sign Up'?<div></div>:<div className="forgot-password">Forgot password? <span>Click Here!</span></div>}
      
      <div className="submit-container">
        <div className={action === 'Login'?'submit gray':'submit'} onClick={()=> {setAction('Sign Up')}}>Sign Up</div>
        <div className={action === 'Sign Up'?'submit gray':'submit'} onClick={()=> {setAction('Login')}}>Login</div>
      </div>
      <button type='Submit' className='btn'>Submit</button>
    </div>
  )
}

export default LoginSignup
