import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddCourse({ student, onCourseAdded, updateCourses }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const [courseData, setCourseData] = useState({
    CourseName: '',
    StudentID: '',
  });

  useEffect(() => {
    if (student) {
      setCourseData((prevCourseData) => ({
        ...prevCourseData,
        StudentID: student,
      }));
    }
  }, [student]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSaveCourse = () => {
    console.log('Course Data:', courseData);
    axios.post('http://localhost:9000/api/course', courseData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log("Course created successfully:", response.data);
        if (typeof onCourseAdded === 'function') {
          onCourseAdded(response.data.obj);
        }

        if (typeof updateCourses === 'function') {
          updateCourses();
        }

        toggleFormVisibility();

        setCourseData({
          CourseName: '',
          StudentID: student,
        });
      })
      .catch((error) => {
        console.error("Error creating course:", error);
      });
  };

  return (
    <div className={`add-course-container ${isFormVisible ? 'open' : ''}`}>
      <button onClick={toggleFormVisibility}>Add Course</button>
      {isFormVisible && (
        <div className="course-form">
          <label htmlFor="newCourse">New Course:</label>
          <input
            type="text"
            id="newCourse"
            value={courseData.CourseName}
            onChange={(e) => setCourseData({ ...courseData, CourseName: e.target.value })}
            placeholder="Enter new course"
          />
          <button onClick={handleSaveCourse}>Save Course</button>
        </div>
      )}
    </div>
  );
}

AddCourse.defaultProps = {
  onCourseAdded: () => {},
};

export default AddCourse;
