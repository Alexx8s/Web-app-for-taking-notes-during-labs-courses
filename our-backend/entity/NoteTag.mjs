// Import necessary modules and dependencies
import db from '../dbConfiguration.mjs';
import Sequelize from 'sequelize';

// Define the "NoteTags" model
const NoteTag = db.define('NoteTag', {
  NoteID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  TagID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
}, {
  tableName: 'Notetags',
  timestamps: false,
});

db.sync()
    .then(() => console.log('Task table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// Export the NoteTag model
export default NoteTag;