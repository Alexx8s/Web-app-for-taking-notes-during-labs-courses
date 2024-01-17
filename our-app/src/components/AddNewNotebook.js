// AddNewNotebook.js
import React from 'react';
import '../components-styles/AddNewNotebook.css';

const AddNewNotebook = ({ onClose }) => {
  const handleSubmit = () => {
    console.log('Add New Notebook Logic');
    // Implement logic for adding a new notebook
    // You can use form data or state to capture the notebook details
    // After adding the notebook, close the component using onClose
    onClose();
  };

  return (
    <div className="add-new-notebook">
      <h2>Add New Notebook</h2>
      <form>
        <label>Title:</label>
        <input type="text" name="title" />

        <label>Content:</label>
        <textarea name="content" />

        <label>Course:</label>
        <select name="course">
          <option value="CourseA">Course A</option>
          <option value="CourseB">Course B</option>
        </select>

        <button type="button" onClick={handleSubmit}>Add Notebook</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddNewNotebook;
