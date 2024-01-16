import db from '../dbConfig.js';
import Sequelize from 'sequelize';
import Note from './Notes.mjs';
import Student from './Students.mjs';

const NoteSharing = db.define('NoteSharing', {
  NoteID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Note,
      key: 'NoteID',
    },
  },
  StudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Student,
      key: 'StudentID',
    },
  },
  SharedStudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Student,
      key: 'StudentID',
    },
  },
});

export default NoteSharing;
