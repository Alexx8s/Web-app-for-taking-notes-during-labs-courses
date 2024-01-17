import React, { useEffect, useState } from 'react';
import AddGroup from './AddGroup';
import '../components-style/MyMenu.css';
import AddCourse from './AddCourse';
import axios from 'axios';

const MyMenu = ({ studentID, onCourseSelect, onHomeClick, updateCourses, onTagSelect }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [updateCourses]);

  useEffect(() => {
    fetchTags(selectedCourse);
  }, [selectedCourse]);

  const handleCourseSelect = (courseID) => {
    setSelectedCourse(courseID);
    if (onCourseSelect) {
      onCourseSelect(courseID);
    }
  };

  const handleHomeClick = () => {
    setSelectedCourse('');
    setSelectedTag('');

    if (onHomeClick) {
      onHomeClick();
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    if (onTagSelect) {
      onTagSelect(tag);
    }
  };

  const fetchTags = (courseID) => {
    axios
      .get(`http://localhost:9000/api/tags/${courseID}`)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });
  };

  const fetchCourses = () => {
    axios
      .get(`http://localhost:9000/api/courses/${studentID}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  return (
    <div className="menu-container">
      <h3 className="menu-title">Menu</h3>
      <input type="text" placeholder="Search.." name="search" className="menu-search" />
      <ul className="menu-options">
        <li className="menu-option home-button" onClick={handleHomeClick}>
          Home
        </li>
        <label htmlFor="courseSelect">Courses</label>
        <select
          id="courseSelect"
          className="form-select"
          aria-label="Default select example"
          value={selectedCourse}
          onChange={(e) => handleCourseSelect(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.CourseID} value={course.CourseID}>
              {course.CourseName}
            </option>
          ))}
        </select>
        <AddCourse student={studentID} updateCourses={updateCourses} />
        <select
          className="form-select"
          aria-label="Default select example"
          value={selectedTag}
          onChange={(e) => handleTagSelect(e.target.value)}
        >
          <option value="">Select Tag</option>
          {tags.map((tag) => (
            <option key={tag.TagID} value={tag.TagName}>
              {tag.TagName}
            </option>
          ))}
        </select>
        <select className="form-select" aria-label="Default select example" defaultValue="Groups">
          <option value="Groups">Groups</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <AddGroup />
      </ul>
      <select className="form-select" aria-label="Default select example" defaultValue="See Groups">
        <option value="SeeGroups">See Groups</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  );
};

export default MyMenu;
