import db from '../dbConfiguration.mjs';
import Sequelize from 'sequelize';

const Grade = db.define('Grade', {
  GradeID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  GradeValue: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  Comments: {
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
});


export default Grade;
