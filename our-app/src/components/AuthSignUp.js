import React, { useState } from 'react';
import '../components-styles/AuthSignUp.css';
import axios from 'axios';
import MainPage from './MainPage';

const AuthSignUp = ({ onSignUp, onSignUpSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [showMainPage, setShowMainPage] = useState(false);
  const [studentId, setStudentId] = useState('');

  const handleSignUp = () => {
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      setError('Please fill out all fields.');
    } else if (email.includes('@stud.ase.ro') === false) {
      setError('Please use your student email.');
    } else {
      var student = {
        LastName: lastName,
        FirstName: firstName,
        Email: email,
        Password: password,
      };
      axios
        .post('http://localhost:8003/api/student/', student, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          console.log('Student created successfully:', response.data);
          setStudentId(response.data.studentId);
          onSignUpSuccess(); // Move onSignUpSuccess here
          setShowMainPage(true);
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    }
  };
  const handleLogout = () => {
    setShowMainPage(false);
  };

  return (
    <div>
      {showMainPage ? (
        <MainPage studentID={studentId} onLogout={handleLogout} />
      ) : (
        <div className="auth-container">
          <h2>Welcome! Create an account here:</h2>

          <div className="input-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default AuthSignUp;
