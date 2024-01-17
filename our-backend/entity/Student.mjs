import db from '../dbConfiguration.mjs';
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
},
  {
    tablename: "Student",
    timestamps: false
  });
  db.sync()
  .then(() => console.log('Task table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));

export default Student;
