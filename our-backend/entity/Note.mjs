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
  SubjectID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Note;