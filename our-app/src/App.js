import React, { useState } from 'react';
import axios from 'axios';

import AuthComponent from './components/AuthComponent';
import AuthSignUp from './components/AuthSignUp';
import MainPage from './components/MainPage';

function App() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showMainPage, setShowMainPage] = useState(false);
  const [studentID, setStudentId] = useState('');
  
  const handleSignIn = async (Email, Password) => {
    try {
      const response = await axios.post('http://localhost:8003/api/student/signin', {
        email: Email,
        password: Password,
      });

      console.log('Sign In Response:', response.data);
      setStudentId(response.data.studentID);
      setShowMainPage(true); 
      setShowSignIn(false);
      return response.data; 
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error; 
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        {showSignIn && <AuthComponent onSignIn={handleSignIn} />}
        {showMainPage && <MainPage studentID={studentID} />} 
      </header>
    </div>
  );
}


export default App;
