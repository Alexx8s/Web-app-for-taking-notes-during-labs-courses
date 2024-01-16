import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components-style/NotePage.css';

function NotePage({ note, onClose, onNoteUpdated }) {
  const [editMode, setEditMode] = useState(false);
  const [noteData, setNoteData] = useState({
    Title: '',
    Content: '',
    CourseID: '',
    CourseName: '',
  });

  const handleEditNote = () => {
    axios
      .put(`http://localhost:9000/api/note/${note.NoteID}`, noteData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('Note updated successfully:', response.data);
        setEditMode(false);
        onNoteUpdated(note.NoteID, noteData);
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
  };

  useEffect(() => {
    if (note) {
      setNoteData({
        Title: note.Title,
        Content: note.Content,
        CourseID: note.CourseID,
      });
      fetchCourseName(note.CourseID);
    }
  }, [note]);

  const fetchCourseName = (courseID) => {
    axios
      .get(`http://localhost:9000/api/course/${courseID}`)
      .then((response) => {
        setNoteData((prevNoteData) => ({
          ...prevNoteData,
          CourseName: response.data.CourseName,
        }));
      })
      .catch((error) => {
        console.error('Error fetching course name:', error);
      });
  };

  const handleTitleChange = (e) => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      Title: e.target.value,
    }));
  };

  const handleContentChange = (e) => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      Content: e.target.value,
    }));
  };

  return (
    <div className="note-page-container">
      <div className="note-page-edit-button">
        {editMode ? (
          <button onClick={handleEditNote}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )}
      </div>
      <div className="note-page-content-container">
        {editMode ? (
          <>
            <input type="text" value={noteData.Title} onChange={handleTitleChange} />
            <input type="text" value={noteData.Content} onChange={handleContentChange} />
          </>
        ) : (
          <>
            <h1>{noteData.Title}</h1>
            <h2>{noteData.CourseName || noteData.CourseID}</h2>
            <div className="note-page-content">
              <p>{noteData.Content}</p>
            </div>
          </>
        )}
      </div>
      <div className="note-page-back-button">
        <button onClick={onClose}>Back</button>
      </div>
    </div>
  );
}

export default NotePage;
