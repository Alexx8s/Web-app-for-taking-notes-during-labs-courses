import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import MyTag from './MyTag';
import '../components-style/MyCard.css';
import axios from 'axios';
import TagSelectionPopup from './TagSelectionPopup';  // Import your TagSelectionPopup component

function MyCard(props) {
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [isTagSelectionOpen, setIsTagSelectionOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(props.tags);

  const getCourseById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/course/${id}`);  // Modify API endpoint
      setCourse(response.data);
    } catch (error) {
      console.error('Error during fetching course:', error);
    }
  };

  const getStudentById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/student/${id}`);  // Modify API endpoint
      setStudent(response.data);
    } catch (error) {
      console.error('Error during fetching student:', error);
    }
  };

  const handleViewClick = () => {
    if (typeof props.onDoubleClick === 'function') {
      props.onDoubleClick(props.noteID);
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (typeof props.onDelete === 'function') {
      props.onDelete();
    }
  };

  const handleTagSelection = (selectedTags) => {
    // Update the tags for the current card
    // Close the tag selection pop-up
    setIsTagSelectionOpen(false);
    setSelectedTags(selectedTags);
  };

  useEffect(() => {
    if (props.studentid) {
      getStudentById(props.studentid);
    }

    if (props.courseid) {
      getCourseById(props.courseid);
    }
  }, [props.studentid, props.courseid]);

  const getTagColor = (tagName) => {
    // Add your specific tag colors based on your requirements
    const tagColors = {
      // Add your tag-color mappings here
    };

    return tagColors[tagName] || 'transparent';
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {student && <Card.Text>{student.FirstName} {student.LastName}</Card.Text>}
        {course && <Card.Text>{course.CourseName}</Card.Text>}
        {selectedTags.map((tag, index) => (
          <MyTag key={index} text={tag} color={getTagColor(tag)} />
        ))}

        <button id="addTagButton" onClick={() => setIsTagSelectionOpen(true)}>
          Add Tag
        </button>

        {isTagSelectionOpen && (
          <TagSelectionPopup
            selectedCourseID={props.courseid}
            existingTags={selectedTags}
            onSelectTags={(selectedTags) => handleTagSelection(selectedTags)}
            onClose={() => setIsTagSelectionOpen(false)}
          />
        )}

        <button id="viewButton" onClick={handleViewClick}>
          View
        </button>
        <button id="deleteButton" onClick={handleDeleteClick}>
          Delete
        </button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
