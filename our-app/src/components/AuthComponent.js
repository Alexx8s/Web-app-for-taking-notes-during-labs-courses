import React, { useState } from 'react';
import '../components-styles/AuthComponent.css';
import MainPage from './MainPage';
import AuthSignUp from './AuthSignUp';
import axios from 'axios';

const AuthComponent = ({ onSignIn, onToggleAuth }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleSignIn = () => {
    if (email && password) {
      // Assuming you have these states declared in your component
      axios.post('http://localhost:8003/api/user/signin', { email, password })
        .then((response) => {
          console.log('Sign In Successful:', response.data);
          setAuthenticated(true);
        })
        .catch(() => {
          console.error('Sign In Failed');
          // Handle sign-in failure if needed
        });
    } else {
      // Handle empty fields
      console.error('Email and password are required');
    }
  };

  const handleToggleSignUp = () => {
    
    setShowSignUp(!showSignUp);
    onToggleAuth(); // Toggle between sign-in and sign-up
  };

  return (
    <div>
      {!showSignUp && !authenticated && (
        <div className="auth-container">
          <h2>Sign In</h2>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleSignIn}>Sign In</button>
          <div className="or-divider">OR</div>
          <button onClick={handleToggleSignUp}>Sign Up</button>
        </div>
      )}
      {showSignUp && <AuthSignUp onToggleAuth={onToggleAuth} />}
      {authenticated && <MainPage />}
    </div>
  );
};

export default AuthComponent;
