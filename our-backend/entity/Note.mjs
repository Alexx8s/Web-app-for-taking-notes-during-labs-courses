// Import necessary modules and dependencies
import db from '../dbConfiguration.mjs';
import Sequelize from 'sequelize';

const Note = db.define('Note', {
  NoteID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  Content: {
    type: Sequelize.TEXT,
  },
  CourseID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  StudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Notes',
  timestamps: false,
});
db.sync()
    .then(() => console.log('Task table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

export default Note;