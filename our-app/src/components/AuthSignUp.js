import React, { useState } from 'react';
import '../components-styles/AuthSignUp.css';


const AuthSignUp = ({ onToggleAuth }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSignUp = () => {
      if (firstName === '' || lastName === '' || email === '' || password === '') {
        setError('Please fill out all fields.');
      } else if (email.includes('@stud.ase.ro') === false) {
        setError('Please use your student email.');
      } else {
        // Perform sign-up logic (without axios and onSignUpSuccess)
        console.log('Sign Up:', { firstName, lastName, email, password });
        // You can add any logic you need here for the sign-up process
      }
    };
  
    return (
      <div className="auth-container">
        <span className="close-btn" onClick={onToggleAuth} id="back">
          Go Back
        </span>
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
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    );
  };
  
  export default AuthSignUp;