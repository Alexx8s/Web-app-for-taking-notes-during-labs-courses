// Notebook.js
import React, { useState } from 'react';
import '../components-styles/Notebook.css';
import axios from 'axios';

const Notebook = ({ noteID, title, userEmail, content, course, onClose, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const formatContent = (rawContent) => {
    return { __html: rawContent };
  };

  const handleSendEmail = () => {
    const recipientEmail = 'your-email@example.com';
    const emailSubject = encodeURIComponent(title);
    const emailBody = encodeURIComponent(content);
    const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoLink;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8003/api/note/${noteID}`);
      onDelete();
      onClose();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `http://localhost:8003/api/note/${noteID}`,
        { Content: editedContent },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((response) => {
        onEdit(response.data.obj);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  return (
    <div className="notebook-details">
      <h2>{title}</h2>
      <p>User: {userEmail}</p>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="edit-content"
        />
      ) : (
        <div className="content" dangerouslySetInnerHTML={formatContent(content)} />
      )}
      <p>Course: {course}</p>
      {isEditing ? (
        <>
          <button onClick={handleSaveEdit} id="saveEdit">
            Save Edit
          </button>
          <button onClick={handleCancelEdit} id="cancelEdit">
            Cancel Edit
          </button>
        </>
      ) : (
        <>
          <button onClick={onClose} id="back">
            Close
          </button>
          <button onClick={handleSendEmail} id="sendEmail">
            Send via Email
          </button>
          <button onClick={handleDelete} id="deleteNote">
            Delete Note
          </button>
          <button onClick={handleEdit} id="editNote">
            Edit Note
          </button>
        </>
      )}
    </div>
  );
};

export default Notebook;
