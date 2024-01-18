import mysql from 'mysql2/promise.js';
import env from 'dotenv';
import Student from './Student.mjs';
import Tag from './Tag.mjs';
import Course from './Course.mjs';
import Grade from './Grade.mjs';
import Note from './Note.mjs';

env.config();


export async function Create_DB() {
    let conn;

    try {
        const connection = await mysql.createConnection({
            user: "root",
            password: "1234",
        });

        conn = connection;
        await connection.query(`CREATE DATABASE IF NOT EXISTS WEBAPP`);
        console.log('Database created or already exists.');

        // Add a delay (1 second) to allow MySQL to propagate changes
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
        console.warn(err.stack);
        throw err;  // Propagate the error to handle it in the calling code
    } finally {
        if (conn) {
            await conn.end();
        }
    }
}

function FK_Config() {
    Course.belongsTo(Student, { foreignKey: 'StudentID' });
    Student.hasMany(Course, { foreignKey: 'StudentID' });
    
    Student.hasMany(Note, { foreignKey: 'StudentID' });
    Note.belongsTo(Student, { foreignKey: 'StudentID' });

    Note.belongsTo(Course, { foreignKey: 'CourseID' });
    Course.hasMany(Note, { foreignKey: 'CourseID' });

    Note.belongsToMany(Tag, { through: 'NoteTags' });
    Tag.belongsToMany(Note, { through: 'NoteTags' });
}



function DB_Init() {
    return new Promise((resolve, reject) => {
        Create_DB()
            .then(() => {
                FK_Config();
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
}

async function seedDatabase() {
    // Initialize the database
    await Create_DB();

    try {
        // Seed students
        for (let studentID = 1; studentID <= 8; studentID++) {
            const student = await Student.create({
                StudentID: studentID,
                Email: `student${studentID}@stud.ase.ro`,
                Password: '1234',
                FirstName: `FirstName${studentID}`,
                LastName: `LastName${studentID}`,
            });

            console.log(`Student added with ID ${studentID}`);

            // Seed courses for each student
            const course = await Course.create({
                CourseName: `CSE 316 - Course for Student ${studentID}`,
                StudentID: studentID,
            });

            console.log(`Course added for StudentID ${studentID}`);
        }

        console.log('Dummy students and courses added to the database.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }

    // Add some sample data
    try {
        // Loop through student IDs from 1 to 8
        for (let studentID = 1; studentID <= 8; studentID++) {
            // Create a course for each student
            const course = await Course.create({
                CourseName: `CSE 316 - Course for Student ${studentID}`,
                StudentID: studentID,
            });

            console.log(`Course added for StudentID ${studentID}`);
        }

        console.log('Sample data added to the database.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}

// Uncomment the line below when you want to seed the database
 //seedDatabase();

export  { FK_Config, DB_Init, seedDatabase };
export default DB_Init;
