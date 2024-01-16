import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import User from './User.js';
import Tag from './Tag.js';
import Subject from './Subject.js';
import Note from './Note.js';

env.config();

function Create_DB(){
    let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    conn = connection
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}
function FK_Config() {
      
    Student.hasMany(Course, { as: 'Courses', foreignKey: 'StudentID' });
    Course.belongsTo(Student, { as: 'Student', foreignKey: 'StudentID' });
  
  
    Student.hasMany(Grade, { as: 'Grades', foreignKey: 'StudentID' });
    Grade.belongsTo(Student, { as: 'Student', foreignKey: 'StudentID' });
  

    Course.hasMany(Grade, { as: 'Grades', foreignKey: 'CourseID' });
    Grade.belongsTo(Course, { as: 'Course', foreignKey: 'CourseID' });
   
    Module.belongsToMany(Tag, { as: 'Tags', through: 'NoteTag', foreignKey: 'NoteID' });
    Tag.belongsToMany(Module, { as: 'Notes', through: 'NoteTag', foreignKey: 'TagID' });
  }
  

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;