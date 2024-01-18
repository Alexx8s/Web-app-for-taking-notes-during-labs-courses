import React, { useState, useEffect } from 'react';
import '../components-styles/AddNewNotebook.css';
import axios from 'axios';

const AddNewNotebook = ({ onClose, studentId }) => {
  const [courses, setCourses] = useState([]);
  const [notebookData, setNotebookData] = useState({
    title: '',
    content: '',
    selectedCourse: '',
  });

  useEffect(() => {
    // Fetch courses when the component mounts
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get(`http://localhost:8003/api/courses/${studentId}`)
      .then((response) => {
        setCourses(response.data);
        console.log('Courses:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotebookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Add New Notebook Logic');
    // Implement logic for adding a new notebook
    // You can use notebookData to capture the notebook details, including the selectedCourse
    // After adding the notebook, close the component using onClose
    onClose();
  };

  return (
    <div className="add-new-notebook">
      <h2>Add New Notebook</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={notebookData.title}
          onChange={handleInputChange}
        />

        <label>Content:</label>
        <textarea
          name="content"
          value={notebookData.content}
          onChange={handleInputChange}
        />

        <label>Course:</label>
        <select
          name="selectedCourse"
          value={notebookData.selectedCourse}
          onChange={handleInputChange}
        >
          <option value="">Select a Course</option>
          {courses.map((course) => (
            <option key={course.CourseID} value={course.CourseID}>
              {course.CourseName}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleSubmit}>
          Add Notebook
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddNewNotebook;
