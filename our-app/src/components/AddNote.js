import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components-style/AddNote.css';

function AddNote({ student, onNoteAdded, funcCourseChange }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    courseID: '',
    studentID: '',
    selectedTags: [],
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9000/api/courses/${student}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });

    axios.get('http://localhost:9000/api/tags')
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });
  }, [student, funcCourseChange]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  };

  const handleCourseChange = (e) => {
    setNoteData({
      ...noteData,
      courseID: e.target.value,
    });
  };

  useEffect(() => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      studentID: student,
    }));
  }, [student]);

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setNoteData({
      ...noteData,
      selectedTags,
    });
  };

  const handleSaveNote = () => {
    console.log('Note Data:', noteData);
    axios.post('http://localhost:9000/api/note', noteData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log("Note created successfully:", response.data);
        onNoteAdded(response.data.obj);
        setNoteData({
          title: '',
          content: '',
          courseID: '',
          studentID: '',
          selectedTags: [],
        });
        toggleFormVisibility();
      })
      .catch((error) => {
        console.error("Error creating note:", error);
      });
  };

  return (
    <div className={`add-note-container ${isFormVisible ? 'open' : ''}`}>
      <button onClick={toggleFormVisibility}>Add Note</button>
      {isFormVisible && (
        <div className="note-form">
          <label htmlFor="courseSelect">Select Course:</label>
          <select
            id="courseSelect"
            className="form-select"
            aria-label="Default select example"
            value={noteData.courseID}
            onChange={handleCourseChange}
            name="courseID"
          >
            <option value="">Select Course</option>

            {courses.map((course) => (
              <option key={course.CourseID} value={course.CourseID}>
                {course.CourseName}
              </option>
            ))}
          </select>

          <label htmlFor="noteTitle">Note Title:</label>
          <input
            type="text"
            id="noteTitle"
            name="title"
            value={noteData.title}
            onChange={handleInputChange}
            placeholder="Enter note title"
          />

          <label htmlFor="noteContent">Note Content:</label>
          <textarea
            id="noteContent"
            name="content"
            value={noteData.content}
            onChange={handleInputChange}
            placeholder="Enter note content"
          ></textarea>

          <label htmlFor="tagSelect">Select Tags:</label>
          <select
            id="tagSelect"
            className="form-select"
            aria-label="Default select example"
            multiple
            value={noteData.selectedTags}
            onChange={handleTagChange}
          >
            {tags.map((tag) => (
              <option key={tag.TagID} value={tag.TagID}>
                {tag.TagName}
              </option>
            ))}
          </select>

          <button onClick={handleSaveNote}>Save Note</button>
        </div>
      )}
    </div>
  );
}

export default AddNote;
