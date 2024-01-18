// NavBar.js
import React from 'react';
import '../components-styles/NavBar.css';

const NavBar = ({ onAddNotebook, onLogout, onShare }) => {
  return (
    <div className="navbar">
      <button onClick={onAddNotebook}>Add New Notebook</button>
      <button onClick={onLogout}>Logout</button>
    
    </div>
  );
};

export default NavBar;
