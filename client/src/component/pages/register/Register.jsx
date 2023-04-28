import React from 'react';
import "./Register.scss";
import { useState, useRef } from 'react';
import { Link } from '@mui/material';
function Register() {
  const [email, setEmail] = useState("");// set to store the email
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleStart = () => {
    setEmail(emailRef.current.value)
  }

  const handleFinish = () => {
    setPassword(emailRef.current.value)
  }
  return (
    <div className='register'>
        <div className="top">
          <div className="wrapper">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="" 
              className="logo" />

             <Link to="/movies" className='link'> 
                <button className="loginButton">
                <span>Sign In</span>
                </button>
             </Link>
              
          </div>  
        </div>
        <div className="container">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          {!email ? (  // if no email, see eamil input. has email, password input
           <div className="input">
           <input type="email" placeholder='Email Address' ref={emailRef}/>
           <button className="registerButton" onClick={handleStart}>Get Started</button>
         </div>
          ) : (
            <form className="input">
            <input type="password" placeholder='Password' ref={passwordRef}/>
            <button className="registerButton" onClick={handleFinish}> Start</button>
            </form>
          )}

  
        </div>
    </div>
  )
}

export default Register