// AuthComponent.js
import React, { useState } from 'react';
import '../components-styles/AuthComponent.css';
import AuthSignUp from './AuthSignUp'; // Update the import based on your file structure

const AuthComponent = ({ onSignIn, onToggleAuth }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign-in logic
    console.log('Sign In:', { email, password });
    onSignIn(); // Assuming you want to perform additional actions after sign-in
  };

  const handleToggleSignUp = () => {
    setShowSignUp(!showSignUp);
    onToggleAuth(); // Toggle between sign-in and sign-up
  };

  return (
    <div>
      {!showSignUp && (
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
    </div>
  );
};

export default AuthComponent;
