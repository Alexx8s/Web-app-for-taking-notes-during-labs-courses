// AuthComponent.js
import React, { useState } from 'react';
import '../components-styles/AuthComponent.css';
import AuthSignUp from '../components/AuthSignUp';
import MainPage from './MainPage';
import axios from 'axios';

function AuthComponent({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showMainPage, setShowMainPage] = useState(false);

  const handleSignUpSuccess = () => {
    setShowMainPage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        await onSignIn(email, password);
        setShowMainPage(true);
        console.log('Redirecting to MainPage...');
      } catch (error) {
        setShowMainPage(false);
        alert('Sign in failed. Please try again.');
      }
    } else {
      setShowMainPage(false);
      alert('Email and password are required.');
    }
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  if(showSignUp) {
    return <AuthSignUp onSignUpSuccess={handleSignUpSuccess} />;
  }
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Welcome to APPNAME!</h1>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
        <div className="or-divider">
          <h2>Don't have an account?</h2>
          <div className="signup-link" onClick={handleSignUpClick}>
            Sign up
          </div>
        </div>
      </form>

      {/* {showSignUp && <AuthSignUp onSignUpSuccess={handleSignUpSuccess} />}
      {showMainPage && <MainPage />} */}
    </div>
  );
}

export default AuthComponent;
