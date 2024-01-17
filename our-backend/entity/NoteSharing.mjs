import db from '../dbConfiguration.mjs';
import Sequelize from 'sequelize';
import Note from './Notes.mjs';
import Student from './Students.mjs';

const NoteSharing = db.define('NoteSharing', {
  NoteID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // primaryKey: true,
    references: {
      model: Note,
      key: 'NoteID',
    },
  },
  StudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // primaryKey: true,
    references: {
      model: Student,
      key: 'StudentID',
    },
  },
  SharedStudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // primaryKey: true,
    references: {
      model: Student,
      key: 'StudentID',
    },
  },
},{
  primaryKey: true,
  tableName: 'Notesharing',
  timestamps: false,
});
db.sync()
    .then(() => console.log('Task table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

export default NoteSharing;
