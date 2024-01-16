import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components-style/TagSelectionPopup.css';

const TagSelectionPopup = ({ selectedCourseID, existingTags, onSelectTags, onClose }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, [selectedCourseID]);

  const fetchTags = () => {
    if (selectedCourseID) {
      axios
        .get(`http://localhost:9000/api/tags/${selectedCourseID}`)
        .then((response) => {
          setTags(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tags:', error);
        });
    }
  };

  const handleTagToggle = (tagID, checked) => {
    onSelectTags((prevTags) => {
      if (checked) {
        return [...prevTags, tagID];
      } else {
        return prevTags.filter((id) => id !== tagID);
      }
    });
  };

  return (
    <div>
      <h4>Existing Tags</h4>
      <ul>
        {tags.map((tag) => (
          <li key={tag.TagID}>
            <label>
              <input
                type="checkbox"
                checked={existingTags.includes(tag.TagID)}
                onChange={(e) => handleTagToggle(tag.TagID, e.target.checked)}
              />
              {tag.TagName}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TagSelectionPopup;
