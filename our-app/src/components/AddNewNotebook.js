// AddNewNotebook.js
import React, { useState, useEffect } from 'react';
import '../components-styles/AddNewNotebook.css';
import axios from 'axios';

function AddNewNotebook({ onClose, onNotebookAdded, onNotebookEdited, studentId, initialNotebook }) {
  const [courses, setCourses] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [notebookData, setNotebookData] = useState({
    Title: '',
    Content: '',
    CourseID: '', // Updated to store the selected course's ID
    StudentID: studentId,
  });

  useEffect(() => {
    // If initialNotebook is provided, populate the form with its data for editing
    if (initialNotebook) {
      setNotebookData(initialNotebook);
      setFormVisible(true);
    }
  }, [initialNotebook]);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/api/courses/${studentId}`);
        
        // Check if the response data is an array or a single object
        const coursesArray = Array.isArray(response.data) ? response.data : [response.data];
        
        setCourses(coursesArray);
      } catch (error) {
        console.error('Error during getting courses:', error);
      }
    };
  
    fetchCourses();
  }, [studentId]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSaveNotebook = async () => {
    try {
      if (initialNotebook) {
        // If initialNotebook exists, it means we are editing, so make a PUT request
        await axios.put(`http://localhost:8003/api/note/${initialNotebook.NoteID}`, notebookData, {
          headers: { 'Content-Type': 'application/json' },
        });
        // Call the onNotebookEdited function with the edited notebook
        onNotebookEdited();
      } else {
        // If initialNotebook is not provided, it means we are creating, so make a POST request
        const response = await axios.post('http://localhost:8003/api/note', notebookData, {
          headers: { 'Content-Type': 'application/json' },
        });
        // Call the onNotebookAdded function with the newly created notebook
        onNotebookAdded(response.data.obj);
      }

      setNotebookData({
        Title: '',
        Content: '',
        CourseID: '',
        StudentID: studentId,
      });

      toggleFormVisibility();
    } catch (error) {
      console.error('Error creating/editing note:', error);
    }
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
      <h2>{initialNotebook ? 'Edit Notebook' : 'Add New Notebook'}</h2>
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
          {initialNotebook ? 'Save Changes' : 'Add Notebook'}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddNewNotebook;
