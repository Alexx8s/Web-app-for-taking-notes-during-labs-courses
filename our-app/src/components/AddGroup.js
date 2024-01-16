import React, { useState } from 'react';
import '../components-style/AddGroup.css';

function AddGroup() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedRole, setSelectedRole] = useState('Users');

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setGroupDescription(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSaveGroup = () => {
    // Add your logic to save the group data
    console.log('Group Name:', groupName);
    console.log('Group Description:', groupDescription);
    console.log('Selected Role:', selectedRole);

    // Clear the form and hide it after saving
    setGroupName('');
    setGroupDescription('');
    setSelectedRole('Users');
    setFormVisible(false);
  };

  return (
    <div id="add-group-container" className={`add-group-container ${isFormVisible ? 'open' : ''}`}>
      <button onClick={toggleFormVisibility}>Add Group</button>
      {isFormVisible && (
        <div className="group-form">
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={handleInputChange}
            placeholder="Enter group name"
          />

          <label htmlFor="groupDescription">Group Description:</label>
          <textarea
            id="groupDescription"
            value={groupDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter group description"
          />

          <div className="role-dropdown">
            <label htmlFor="role">Select Role:</label>
            <select
              id="role"
              className="form-select"
              aria-label="Default select example"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="Users">Users</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <button onClick={handleSaveGroup}>Save Group</button>
        </div>
      )}
    </div>
  );
}

export default AddGroup;
