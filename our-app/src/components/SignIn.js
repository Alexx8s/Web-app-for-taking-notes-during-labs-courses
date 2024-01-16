import React, { useState } from 'react';
import '../components-style/SignIn.css';
import SignUp from '../components/SignUp';
import MainPage from './MainPage';
import axios from 'axios';

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [redirectToMain, setRedirectToMain] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      onSignIn(email, password)
        .then((response) => {
          setRedirectToMain(true);
          console.log('Redirecting to the Dashboard...');
        })
        .catch(() => {
          setRedirectToMain(false);
          alert('Sign in failed. Please check your credentials and try again.');
        });
    } else {
      setRedirectToMain(false);
      alert('Email and password are required.');
    }
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleSignUpSuccess = () => {
    setRedirectToMain(true);
  };

  if (showSignUp) {
    return <SignUp onSignUpSuccess={handleSignUpSuccess} />;
  }

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1>Welcome to Your App!</h1>
        <input
          style={{ marginBottom: '15px' }}
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ marginBottom: '15px' }}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <div className="divider">
          <h2>Don't have an account?</h2>
          <div className="signup-link" onClick={handleSignUpClick}>
            Sign up here
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;