import mysql from 'mysql2/promise.js';
import env from 'dotenv';
import Student from './Student.mjs';
import Tag from './Tag.mjs';
import Course from './Course.mjs';
import Grade from './Grade.mjs';
import Note from './Note.mjs';

env.config();

async function Create_DB() {
    let conn;

    try {
        const connection = await mysql.createConnection({
            user: "root",
            password: "1234",
        });

        conn = connection;
        await connection.query(`CREATE DATABASE IF NOT EXISTS WEBAPP`);
    } catch (err) {
        console.warn(err.stack);
    } finally {
        if (conn) {
            await conn.end();
        }
    }
}

async function FK_Config() {
    Student.hasMany(Course, { as: 'Courses', foreignKey: 'StudentID' });
    Course.belongsTo(Student, { as: 'Student', foreignKey: 'StudentID' });

    Student.hasMany(Grade, { as: 'Grades', foreignKey: 'StudentID' });
    Grade.belongsTo(Student, { as: 'Student', foreignKey: 'StudentID' });

    Course.hasMany(Grade, { as: 'Grades', foreignKey: 'CourseID' });
    Grade.belongsTo(Course, { as: 'Course', foreignKey: 'CourseID' });

    Note.belongsToMany(Tag, { as: 'Tags', through: 'NoteTag', foreignKey: 'NoteID' });
    Tag.belongsToMany(Note, { as: 'Notes', through: 'NoteTag', foreignKey: 'TagID' });

    Student.hasMany(Note, { as: 'Notes', foreignKey: 'StudentID' });
    Note.belongsTo(Student, { as: 'Student', foreignKey: 'StudentID' });

    Course.hasMany(Note,{as:'Notes',foreignKey:"CourseID"});
    Note.belongsTo(Course,{as:'Course',foreignKey:"CourseID"});

}

async function DB_Init() {
    await Create_DB();
    await FK_Config();
}

export default DB_Init;
