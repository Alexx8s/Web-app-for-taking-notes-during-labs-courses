import Student from "../entity/Student.mjs";
import Course from "../entity/Course.mjs";
import Grade from "../entity/Grade.mjs";
import LikeOp from "./LikeOp.mjs";

async function getStudents() {
    return await Student.findAll({ include: ["Courses", "Grades"] });
}

async function getStudentById(id) {
    return await Student.findByPk(id, { include: ["Courses", "Grades"] });
}

async function createStudent(student) {
    return await Student.create(student);
}

async function deleteStudent(id) {
    let student = await Student.findByPk(id);
    return await student.destroy();
}

async function updateStudent(id, student) {
    try {
        let updatedStudent = await getStudentById(id);
        if (!updatedStudent) return { error: true, msg: "No entity found" };
        await updatedStudent.update(student);
        updatedStudent = await getStudentById(id);
        return { error: false, msg: "Student updated successfully", obj: updatedStudent };
    } catch (error) {
        return { error: true, msg: "Error updating student" };
    }
}

async function getStudentByPasswordEmail(password, email) {
    return await Student.findOne({ where: { password: password, email: email } });
}

export {
    getStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudent,
    getStudentByPasswordEmail
};