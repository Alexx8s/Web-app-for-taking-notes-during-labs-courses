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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [notebooks, setNotebooks] = useState([]);
  const [courses, setCourses] = useState([]);

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
    try {
      const response = await axios.get(`http://localhost:8003/api/note/student/${studentID}`);
      console.log('Notes:', response.data);
      setNotebooks(response.data);
    } catch (error) {
      console.error('Error during getting notes:', error);
      throw error;
    }
  };

  const getCoursesByStudId = async (studentID) => {
    try {
      const response = await axios.get(`http://localhost:8003/api/course/${studentID}`);
      console.log('Courses:', response.data);
      setCourses(response.data);
    } catch (error) {
      console.error('Error during getting courses:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (studentID) {
      getNotesByUserId(studentID);
      getCoursesByStudId(studentID);
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
            notebook.Title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCourse === '' || notebook.CourseID === selectedCourse)
          )
          .map((notebook) => (
            <div className="notebook" key={notebook.NoteID} onClick={() => handleNotebookClick(notebook)}>
              <h3>{notebook.Title}</h3>
              <div className="course">{notebook.CourseID}</div>
            </div>
          ))}
      </div>
      {isNotebookVisible && selectedNotebook && (
        <Notebook
          title={selectedNotebook.Title}
          userEmail={selectedNotebook.userEmail}
          content={selectedNotebook.Content}
          course={selectedNotebook.CourseID}
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
            {Array.isArray(courses)
              ? courses.map((course) => (
                  <option key={course.CourseID} value={course.CourseID}>
                    {course.CourseName}
                  </option>
                ))
              : <option value={courses.CourseID}>{courses.CourseName}</option>}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
