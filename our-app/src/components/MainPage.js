// MainPage.js
import React, { useState,useEffect } from 'react';
import '../components-styles/MainPage.css';
import NavBar from './NavBar.js';
import Notebook from './Notebook.js';
import AddNewNotebook from './AddNewNotebook.js';
import axios from 'axios';




const MainPage = ({StudentID}) => {
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [isNotebookVisible, setIsNotebookVisible] = useState(false);
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);

  const testContent = `
    <h1>This is a Test Header 1</h1>
    <p>This is a test paragraph with <i>italic</i> and <b>bold</b> text.</p>
    <h2>This is a Test Header 2</h2>
    <p>Another test paragraph with <u>underline</u> and <i>italic</i> text.</p>
    <h3>This is a Test Header 3</h3>
    <p>One more test paragraph with <b>bold</b> and <i>italic</i> text.</p>
  `;

  const notebooks = [
    { id: 1, title: 'Notebook 1', userEmail: 'user@example.com', content: 'Content 1', course: 'CourseA' },
    { id: 2, title: 'Notebook 2', userEmail: 'user@example.com', content: 'Content 2', course: 'CourseB' },
    { id: 3, title: 'Notebook 3', userEmail: 'mail@mail.com', content: testContent, course: 'CourseA' },
  ];

  const handleAddNotebook = () => {
    setIsAddNewVisible(true);
  };

  const handleLogout = () => {
    console.log('Logout');
    // Implement logic for logging out
    // For example, you can reset the authentication status
  };

  const handleShare = () => {
    console.log('Share');
    // Implement logic for sharing

    
  };

  const handleNotebookClick = (notebook) => {
    setSelectedNotebook(notebook);
    setIsNotebookVisible(true);
  };

  const handleCloseNotebook = () => {
    setIsNotebookVisible(false);
  };

  const handleCloseAddNew = () => {
    setIsAddNewVisible(false);
  };

  const getNotesByUserId = async (StudentID) => {
    try {
      const response = await axios.get(`http://localhost:8003/api/note/${StudentID}`);
      console.log('Notes:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during getting notes:', error);
      throw error;
    }
  }


  useEffect(() => {
    if(StudentID){
      getNotesByUserId(StudentID);
    }
  }
  , [StudentID]);

  return (
    <div className="main-page">
      <NavBar
        onAddNotebook={handleAddNotebook}
        onLogout={handleLogout}
        onShare={handleShare}
      />
      <div className="sarchBar">
        <input type="text" placeholder="Search" id="searchBar" />
        </div>

      <div className="notebooks">
        {notebooks.map((notebook) => (
          <div className="notebook" key={notebook.id} onClick={() => handleNotebookClick(notebook)}>
            <h3>{notebook.title}</h3>
            <div className="course">{notebook.course}</div>
          </div>
        ))}
      </div>
      {isNotebookVisible && selectedNotebook && (
        <Notebook
          title={selectedNotebook.title}
          userEmail={selectedNotebook.userEmail}
          content={selectedNotebook.content}
          course={selectedNotebook.course}
          onClose={handleCloseNotebook}
        />
      )}

      {isAddNewVisible && (
        <AddNewNotebook onClose={handleCloseAddNew} 
        onNotebookAdded={AddNewNotebook}
        studentId = {StudentID}/>
      )}

      <div className="filters">
        <div className="filter">
          <label>Course:</label>
          <select>
            <option value="">All</option>
            <option value="CourseA">Course A</option>
            <option value="CourseB">Course B</option>
          </select>
        </div>
        <div className="filter">
          <label>Tags:</label>
          <select>
            <option value="">All</option>
            <option value="TagA">Tag A</option>
            <option value="TagB">Tag B</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
