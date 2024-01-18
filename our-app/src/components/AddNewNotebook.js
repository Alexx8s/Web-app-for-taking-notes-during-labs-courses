import React, { useState, useEffect } from 'react';
import '../components-styles/AddNewNotebook.css';
import axios from 'axios';

function AddNewNotebook ({ onClose,onNotebookAdded, studentId })  {
  const [courses, setCourses] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [notebookData, setNotebookData] = useState({
    CourseID: '',
    CourseName: '',
    StudentID: '',
  });

 

  useEffect(() => {
    // Fetch courses when the component mounts
    if(studentId){
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
    
  fetchCourses();
    }
    
  }, [studentId]);



  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSaveNotebook = () => {
    console.log('Note Data:', notebookData);
    axios.post('http://localhost:8003/api/note', notebookData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log("Note created successfully:", response.data);
        onNotebookAdded(response.data.obj);
        setNotebookData({
          CourseID: '',
          CourseName: '',
          StudentID: '',
        });
        toggleFormVisibility();
      })
      .catch((error) => {
        console.error("Error creating note:", error);
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
          name="CourseName"  // Update the name to match the property name in notebookData
          value={notebookData.CourseName}  // Update the value to use the correct property
          onChange={handleInputChange}
        />

        <label>Content:</label>
        <textarea
          name="content"
          value={notebookData.content}
          onChange={handleInputChange}
        />
        <label htmlFor="subjectSelect">Select Course:</label>
          <select
            id="selectedCourse"
            className="form-select"
            aria-label="Default select example"
            value={notebookData.selectedCourse}
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
  

        <button type="button" onClick={handleSaveNotebook}>
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
