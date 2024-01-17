// Notebook.js
import React from 'react';
import '../components-styles/Notebook.css';

const Notebook = ({ title, userEmail, content, course, onClose }) => {
  const formatContent = (rawContent) => {
    return { __html: rawContent };
  };

  return (
    <div className="notebook-details">
      <h2>{title}</h2>
      <p>User: {userEmail}</p>
      <div className="content" dangerouslySetInnerHTML={formatContent(content)} />
      <p>Course: {course}</p>
      <button onClick={onClose} id="back">Close</button>
    </div>
  );
};

export default Notebook;
