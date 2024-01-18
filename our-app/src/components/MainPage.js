// MainPage.js
import React, { useState, useEffect } from 'react';
import '../components-styles/MainPage.css';
import NavBar from './NavBar.js';
import Notebook from './Notebook.js';
import AddNewNotebook from './AddNewNotebook.js';
import axios from 'axios';

const MainPage = ({ studentID }) => {
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [isNotebookVisible, setIsNotebookVisible] = useState(false);
  const [isAddNewVisible, setIsAddNewVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const testContent = `
    <h1>This is a Test Header 1</h1>
    <p>This is a test paragraph with <i>italic</i> and <b>bold</b> text.</p>
    <h2>This is a Test Header 2</h2>
    <p>Another test paragraph with <u>underline</u> and <i>italic</i> text.</p>
    <h3>This is a Test Header 3</h3>
    <p>One more test paragraph with <b>bold</b> and <i>italic</i> text.</p>
  `;

  const hardcodedCourses = [
    { CourseID: 1, CourseName: 'Math' },
    { CourseID: 2, CourseName: 'Science' },
    { CourseID: 3, CourseName: 'History' },
    { CourseID: 4, CourseName: 'English' },
    { CourseID: 5, CourseName: 'Computer Science' },
  ];

  const notebooks = [
    { id: 1, title: 'Math Notebook 1', userEmail: 'user@example.com', content: 'Content 1', course: 'Math' },
    { id: 2, title: 'Science Notebook 1', userEmail: 'user@example.com', content: 'Content 2', course: 'Science' },
    { id: 3, title: 'History Notebook 1', userEmail: 'mail@mail.com', content: testContent, course: 'History' },
    { id: 4, title: 'English Notebook 1', userEmail: 'user@example.com', content: 'Content 3', course: 'English' },
    { id: 5, title: 'Computer Science Notebook 1', userEmail: 'user@example.com', content: 'Content 4', course: 'Computer Science' },
    { id: 6, title: 'Math Notebook 2', userEmail: 'mail@mail.com', content: 'Content 5', course: 'Math' },
    { id: 7, title: 'Science Notebook 2', userEmail: 'user@example.com', content: 'Content 6', course: 'Science' },
    { id: 8, title: 'History Notebook 2', userEmail: 'mail@mail.com', content: 'Content 7', course: 'History' },
    { id: 9, title: 'English Notebook 2', userEmail: 'user@example.com', content: 'Content 8', course: 'English' },
    { id: 10, title: 'Computer Science Notebook 2', userEmail: 'user@example.com', content: 'Content 9', course: 'Computer Science' },
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

  const getNotesByUserId = async (studentID) => {
    // try {
    //   const response = await axios.get(`http://localhost:8003/api/note/${studentID}`);
    //   console.log('Notes:', response.data);
    //   setNotes(response.data);
    // } catch (error) {
    //   console.error('Error during getting notes:', error);
    //   throw error;
    // }
  };

  useEffect(() => {
    if (studentID) {
      getNotesByUserId(studentID);
    }
  }, [studentID]);

  return (
    <div className="main-page">
      <NavBar onAddNotebook={handleAddNotebook} onLogout={handleLogout} onShare={handleShare} />
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          id="searchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="notebooks">
        {notebooks
          .filter((notebook) =>
            notebook.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCourse === '' || notebook.course === selectedCourse)
          )
          .map((notebook) => (
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
        <AddNewNotebook onClose={handleCloseAddNew} onNotebookAdded={AddNewNotebook} studentId={studentID} />
      )}

      <div className="filters">
        <div className="filter">
          <label>Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">All</option>
            {hardcodedCourses.map((course) => (
              <option key={course.CourseID} value={course.CourseName}>
                {course.CourseName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
