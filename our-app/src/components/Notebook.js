// Notebook.js
import React from 'react';
import '../components-styles/Notebook.css';
import axios from 'axios';

const Notebook = ({ noteID, title, userEmail, content, course, onClose, onDelete }) => {
  const formatContent = (rawContent) => {
    return { __html: rawContent };
  };

  const handleSendEmail = () => {
    // Replace 'your-email@example.com' with the actual email address you want to send the content to
    const recipientEmail = 'your-email@example.com';

    // Use your preferred method to send an email, such as an API call or a mailto link
    const emailSubject = encodeURIComponent(title);
    const emailBody = encodeURIComponent(content);
    const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Open the default email client with the pre-filled subject and body
    window.location.href = mailtoLink;
  };

  const handleDelete = async () => {
    try {
      // Make a DELETE request to your backend API to delete the note
      await axios.delete(`http://localhost:8003/api/note/${noteID}`);
      // Call the onDelete callback to update the state in the parent component
      onDelete();
      // Close the notebook after deletion
      onClose();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="notebook-details">
      <h2>{title}</h2>
      <p>User: {userEmail}</p>
      <div className="content" dangerouslySetInnerHTML={formatContent(content)} />
      <p>Course: {course}</p>
      <button onClick={onClose} id="back">Close</button>
      <button onClick={handleSendEmail} id="sendEmail">Send via Email</button>
      <button onClick={handleDelete} id="deleteNote">Delete Note</button>
    </div>
  );
};

export default Notebook;
