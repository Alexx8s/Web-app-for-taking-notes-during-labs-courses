import React, { useState } from 'react';

const AuthSignUp = ({ onSignUp, onToggleAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignUp = () => {
      // Handle sign-up logic
      console.log('Sign Up:', { email, password });
      onSignUp(); // Assuming you want to perform additional actions after sign-up
    };
  
    const handleToggleSignIn = () => {
      onToggleAuth(); // Toggle between sign-up and sign-in
    };
  
    return (
      <div className="auth-container">
        <span className="close-btn" onClick={onToggleAuth} id="back">Go Back</span>
        <h2>Welcome! Create an account here:</h2>

        <div className="input-group">
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    );
  };
  
  export default AuthSignUp;