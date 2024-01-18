import Note from '../entity/Note.mjs';
import Tag from '../entity/Tag.mjs';
import Course from '../entity/Course.mjs';
import Student from '../entity/Student.mjs';
import LikeOp from "./LikeOp.mjs";
import NoteTag from '../entity/NoteTag.mjs';

async function getNotes() {
    return await Note.findAll({
        include: [
            { model: Tag, as: 'Tags' },
            { model: Course, as: 'Course' },
            { model: Student, as: 'Student' }
        ]
    });
}

// async function getNoteById(id) {
//     return await Note.findByPk(id, {
//         include: [{ model: Tag, as: 'Tags' }]
//     });
// }

async function getNoteById(id) {
    return await Note.findByPk(id);
}

//function that returns the note with the given student id
async function getNoteByStudentId(id) {
    return await Note.findAll({ where: { StudentID: id } });
}

async function deleteNote(noteId) {
    try {
        const note = await Note.findByPk(noteId);
        if (!note) {
            console.error('Note not found with id:', noteId);
        } else {
            await note.destroy();
        }
    } catch (error) {
        console.error('Error during deleting the note:', error);
        throw error;
    }
}

async function createNote(note) {
    try {
        const courseExists = await Course.findByPk(note.CourseID);
        if (!courseExists) {
            return { error: true, msg: "Invalid CourseID" };
        }

        let createdNote = await Note.create(note);
        return { error: false, msg: "Note created successfully", obj: createdNote };
    } catch (error) {
        console.error('Error during note creation:', error);
        return { error: true, msg: "Error creating note" };
    }
}

// async function createNote(StudentID, Title, Content, CourseID) {
//     try {
//         const courseExists = await Course.findByPk(note.CourseID);
//         if (!courseExists) {
//             return { error: true, msg: "Invalid CourseID" };
//         }

//         let createdNote = await Note.create(note);
//         return { error: false, msg: "Note created successfully", obj: createdNote };
//     } catch (error) {
//         console.error('Error during note creation:', error);
//         return { error: true, msg: "Error creating note" };
//     }
// }

async function updateNote(id, note) {
    try {
        let updateNote = await getNoteById(id);
        if (!updateNote) return { error: true, msg: "No entity found" };
        await updateNote.update(note);
        updateNote = await getNoteById(id);
        return { error: false, msg: "User updated successfully", obj: updateNote };
    } catch (error) {
        return { error: true, msg: "Error updating user" };
    }
}

async function getNotesByUserId(id) {
    return await Note.findAll({
        where: { UserID: id },
        include: [
            { model: Tag, as: 'Tags' },
            { model: Course, as: 'Course' },
            { model: Student, as: 'Student' }
        ]
    });
}

async function getNotesWithFilterAndPagination(filter) {
    async function getNotesWithFilterAndPagination(filter) {
        const take = filter.take ? parseInt(filter.take) : 100;
        const skip = filter.skip ? (parseInt(filter.skip) - 1) * take : 0;
    
        let whereClause = {};
        if (filter.Title) whereClause.Title = {[LikeOp]: `%${filter.Title}%`};
        if (filter.UserID) whereClause.UserID = filter.UserID;
        if (filter.CourseID) whereClause.CourseID = filter.CourseID;
    
        let tagWhereClause = {};
        let tagRequired = false;
        if (filter.TagName) {
            tagWhereClause.TagName = {[LikeOp]: `%${filter.TagName}%`};
            tagRequired = true; // Set to true only if filtering by tags
        }
    
        let courseWhereClause = {};
        let courseRequired = false;
        if (filter.CourseName) {
            courseWhereClause.CourseName = {[LikeOp]: `%${filter.CourseName}%`};
            courseRequired = true;
        }
    
        let studentWhereClause = {};
        let studentRequired = false;
        if (filter.FirstName) {
            studentWhereClause.FirstName = {[LikeOp]: `%${filter.FirstName}%`};
            studentRequired = true;
        }
        if(filter.LastName){
            studentWhereClause.LastName = {[LikeOp]: `%${filter.LastName}%`};
            studentRequired = true;
        }
        if(filter.Email){
            studentWhereClause.Email = {[LikeOp]: `%${filter.Email}%`};
            studentRequired = true;
        }
    
        return await Note.findAndCountAll({
            distinct: true,
            include: [
                {
                    model: Tag,
                    as: 'Tags',
                    where: tagWhereClause,
                    required: tagRequired
                },
                {
                    model: Course,
                    as: 'Course',
                    where: courseWhereClause,
                    required: courseRequired 
                },
                {
                    model: Student,
                    as: 'Student',
                    where: studentWhereClause,
                    required: studentRequired
                }
            ],
            where: whereClause,
            limit: take,
            offset: skip,
        });
    }
}

async function getTagsByNoteId(noteId) {
    try {
        const noteWithTags = await Note.findByPk(noteId, {
            include: [{
                model: Tag,
                as: 'Tags',
                through: { attributes: [] }
            }]
        });

        if (!noteWithTags) {
            console.error('No note found with id:', noteId);
            return [];
        }

        return noteWithTags.Tags.map(tag => tag.get({ plain: true }));
    } catch (error) {
        console.error('Error during retrieving tags for the note:', error);
        throw error;
    }
}

export {
    getNotes,
    getNoteById,
    deleteNote,
    createNote,
    updateNote,
    getNotesWithFilterAndPagination,
    getNotesByUserId,
    getTagsByNoteId,
    getNoteByStudentId
};
