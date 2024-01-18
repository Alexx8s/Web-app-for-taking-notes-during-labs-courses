import React, { useState, useEffect } from 'react';
import '../components-styles/AddNewNotebook.css';
import axios from 'axios';

function AddNewNotebook({ onClose, onNotebookAdded, studentId }) {
  const [courses, setCourses] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [notebookData, setNotebookData] = useState({
    Title: '',
    Content: '',
    CourseID: '',
  });

  const hardcodedCourses = [
    { CourseID: 1, CourseName: 'Math' },
    { CourseID: 2, CourseName: 'Science' },
    { CourseID: 3, CourseName: 'History' },
    { CourseID: 4, CourseName: 'English' },
    { CourseID: 5, CourseName: 'Computer Science' },
  ];

  useEffect(() => {
    setCourses(hardcodedCourses);
  }, []);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSaveNotebook = () => {
    console.log('Note Data:', notebookData);
    axios
      .post('http://localhost:8003/api/note', notebookData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('Note created successfully:', response.data);
        onNotebookAdded(response.data.obj);
        setNotebookData({
          Title: '',
          Content: '',
          CourseID: '',
        });
        toggleFormVisibility();
      })
      .catch((error) => {
        console.error('Error creating note:', error);
      });
  };

  const handleCourseChange = (e) => {
    setNotebookData({
      ...notebookData,
      CourseID: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotebookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderCoursesDropdown = () => {
    return (
      <select
        id="selectedCourse"
        className="form-select"
        aria-label="Default select example"
        value={notebookData.CourseID}
        onChange={handleCourseChange}
        name="CourseID"
      >
        <option value="">Select Course</option>

        {courses.map((course) => (
          <option key={course.CourseID} value={course.CourseID}>
            {course.CourseName}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="add-new-notebook">
      <h2>Add New Notebook</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="Title"
          value={notebookData.Title}
          onChange={handleInputChange}
        />

        <label>Content:</label>
        <textarea
          name="Content"
          value={notebookData.Content}
          onChange={handleInputChange}
        />

        <label htmlFor="selectedCourse">Select Course:</label>
        {renderCoursesDropdown()}

        <button type="button" onClick={handleSaveNotebook}>
          Add Notebook
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddNewNotebook;
