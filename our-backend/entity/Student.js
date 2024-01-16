import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Student = db.define('Student', {
  StudentID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  FirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Student;
