import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';

function App() {
  const [redirectToMain, setRedirectToMain] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSignIn = async (email, password) => {
    // Perform sign-in logic here, for example, make an API call to authenticate the user

    // Assuming your authentication logic sets the userId upon successful sign-in
    setUserId('123'); // Replace '123' with the actual userId if available

    // Redirect to the main page upon successful sign-in
    setRedirectToMain(true);

    // Return a promise for consistent handling
    return Promise.resolve();
  };

  if (redirectToMain) {
    return <MainPage userId={userId} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <SignIn onSignIn={handleSignIn} />
      </header>
    </div>
  );
}

export default App;
