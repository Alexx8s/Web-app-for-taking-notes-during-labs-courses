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
    Student.hasMany(Course);
    Course.belongsTo(Student);

    Student.hasMany(Note);
    Note.belongsTo(Student);

    Course.hasMany(Note);
    Note.belongsTo(Course);

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

// async function seedDatabase() {
//     // Initialize the database
//     await Create_DB();

//     // Add some sample data
//     try {
//         const student = await Student.create({
//             // Provide student data
//             StudentID: 1,
//             Email: "johndoe@gmail.com",
//             Password: "1234",
//             FirstName: "John",
//             LastName: "Doe",
//         });

//         const course = await Course.create({
//             // Provide course data
//             CourseID: 1,
//             CourseName: "CSE 316",
//             StudentID: 1,
//         });

//         const note = await Note.create({
//             // Provide note data
//             NoteID: 1,
//             Title: "Test Note",
//             Content: "This is a test note",
//             CourseID: 1,
//         });

//         const tag = await Tag.create({
//             // Provide tag data
//             TagID: 1,
//             TagName: "Test Tag",
//         });

//         // Associate the data
//         await student.addCourse(course);
//         await student.addNote(note);
//         await note.addTag(tag);

//         console.log('Sample data added to the database.');
//     } catch (error) {
//         console.error('Error seeding the database:', error);
//     }
// }

// Uncomment the line below when you want to seed the database
// seedDatabase();

// export { Create_DB, FK_Config, DB_Init, seedDatabase };
export default DB_Init;
