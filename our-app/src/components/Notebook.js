// Notebook.js
import React from 'react';
import '../components-styles/Notebook.css';

const Notebook = ({ title, userEmail, content, course, onClose }) => {
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

  return (
    <div className="notebook-details">
      <h2>{title}</h2>
      <p>User: {userEmail}</p>
      <div className="content" dangerouslySetInnerHTML={formatContent(content)} />
      <p>Course: {course}</p>
      <button onClick={onClose} id="back">Close</button>
      <button onClick={handleSendEmail} id="sendEmail">Send via Email</button>
    </div>
  );
};

export default Notebook;
