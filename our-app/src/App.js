import React, { useState } from 'react';
import axios from 'axios';

import AuthComponent from './components/AuthComponent';
import AuthSignUp from './components/AuthSignUp';
import MainPage from './components/MainPage';

function App() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleSignIn = (email, password) => {
    console.log('Sign In:', { email, password });

    if (email && password) {
      // Replace 'http://localhost:9000/api/user/signin' with your actual endpoint
      return axios.post('http://localhost:8003/api/user/signin', { email, password })
        .then((response) => {
          console.log('Sign In Successful:', response.data);
          // Additional logic after successful sign-in if needed
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

  const handleSignUp = (userData) => {
    console.log('Sign Up:', userData);

    const { firstName, lastName, email, password } = userData;

    if (firstName === '' || lastName === '' || email === '' || password === '') {
      // Handle empty fields
      console.error('Please fill out all fields.');
    } else if (email.includes('@stud.ase.ro') === false) {
      // Handle invalid email
      console.error('Please use your student email.');
    } else {
      // Perform sign-up logic (without axios and onSignUpSuccess)
      console.log('Sign Up:', { firstName, lastName, email, password });
      // You can add any logic you need here for the sign-up process
      setAuthenticated(true);
    }
  };
  if (redirectToMain) {
    return <MainPage userId={userId} />;
  }

  const handleToggleAuth = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      {!authenticated && showSignIn && (
        <AuthComponent onSignIn={handleSignIn} onToggleAuth={handleToggleAuth} />
        
      )}
      {!authenticated && showSignUp && (
        <AuthSignUp onSignUp={handleSignUp} onToggleAuth={handleToggleAuth} />
      )}
      {authenticated && <MainPage />}
    </div>
  );
}

export default App;
