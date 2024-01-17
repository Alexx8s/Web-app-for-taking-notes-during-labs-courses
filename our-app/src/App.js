import React, { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';

function App() {
  const [redirectToMain, setRedirectToMain] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSignIn = () => {
    console.log('Sign In');
    if (email && password) {
      onSignIn(email, password)
      return axios.post('your_signin_endpoint', { email, password })
        .then((response) => {
          console.log('Sign In Successful:', response.data);
          // Additional logic after successful sign-in if needed
        })
        .catch(() => {
          console.error('Sign In Failed');
          // Handle sign-in failure if needed
        });
    } else {
      // Handle empty fields
      console.error('Email and password are required');
    }
    // Perform sign-in logic, if successful:
    setAuthenticated(true);
  

    // Redirect to the main page upon successful sign-in
    setRedirectToMain(true);

    // Return a promise for consistent handling
    return Promise.resolve();
  };

  return (
    <div className="App">
      <header className="App-header">
        <SignIn onSignIn={handleSignIn} />
      </header>
    </div>
  );
}
export default App;