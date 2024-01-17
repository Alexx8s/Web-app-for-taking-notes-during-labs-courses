import db from '../dbConfiguration.mjs';
import Sequelize from 'sequelize';

const Course = db.define('Course', {
  CourseID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  CourseName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  StudentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
},
  {
    tablename: "Courses",
    timestamps: false
  });

db.sync()
    .then(() => console.log('Task table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

export default Course;