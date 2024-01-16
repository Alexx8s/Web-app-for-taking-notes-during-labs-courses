import Grade from '../entity/Grade.mjs';
import Tag from '../entity/Tag.mjs';
import Student from '../entity/Student.mjs';
import LikeOp from "./LikeOp.mjs";

async function getGrades() {
    return await Grade.findAll({ include: ["Tags", "Student"] });
}

async function getGradeById(id) {
    return await Grade.findByPk(id, { include: ["Tags", "Student"] });
}

async function deleteGrade(id) {
    try {
        const grade = await Grade.findByPk(id);
        if (!grade) {
            console.error('Grade not found with id:', id);
        } else {
            await grade.destroy();
        }
    } catch (error) {
        console.error('Error during deleting the grade:', error);
        throw error;
    }
}

async function createGrade(grade) {
    try {
        const studentExists = await Student.findByPk(grade.Student);

        if (!studentExists) {
            return { error: true, msg: "Invalid StudentID" };
        }

        let createdGrade = await Grade.create(grade);
        return { error: false, msg: "Grade created successfully", obj: createdGrade };
    } catch (error) {
        // Handle and log the error
        console.error('Error during grade creation:', error);
        return { error: true, msg: "Error creating grade" };
    }
}

async function updateGrade(id, grade) {
    try {
        let updatedGrade = await getGradeById(id);
        if (!updatedGrade) return { error: true, msg: "No entity found" };
        await updatedGrade.update(grade);
        updatedGrade = await getGradeById(id);
        return { error: false, msg: "Grade updated successfully", obj: updatedGrade };
    } catch (error) {
        return { error: true, msg: "Error updating grade" };
    }
}

async function getGradesByStudentId(studentId) {
    return await Grade.findAll({ where: { StudentID: studentId } });
}

// Function to get the grades from the database with filter and pagination
async function getGradesWithFilterAndPagination(filter) {
    const take = filter.take ? parseInt(filter.take) : 100;
    const skip = filter.skip ? (parseInt(filter.skip) - 1) * take : 0;

    let whereClause = {};
    if (filter.StudentID) whereClause.StudentID = filter.StudentID;

    let studentWhereClause = {};
    let studentRequired = false;
    if (filter.FirstName) {
        studentWhereClause.FirstName = { [LikeOp]: `%${filter.FirstName}%` };
        studentRequired = true;
    }
    if (filter.LastName) {
        studentWhereClause.LastName = { [LikeOp]: `%${filter.LastName}%` };
        studentRequired = true;
    }
    if (filter.Email) {
        studentWhereClause.Email = { [LikeOp]: `%${filter.Email}%` };
        studentRequired = true;
    }

    return await Grade.findAndCountAll({
        distinct: true,
        include: [
            {
                model: Tag,
                as: 'Tags',
                through: { attributes: [] } // Exclude the join table attributes
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

export {
    getGrades,
    getGradeById,
    deleteGrade,
    createGrade,
    updateGrade,
    getGradesByStudentId,
    getGradesWithFilterAndPagination
};
