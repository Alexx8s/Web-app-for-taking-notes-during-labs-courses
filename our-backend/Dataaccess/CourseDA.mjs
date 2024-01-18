import Course from '../entity/Course.mjs';

async function getCourses() {
    return await Course.findAll();
}

async function getCourseById(ID) {
    return await Course.findByPk(ID);
}

async function createCourse(course) {
    try {
        let createdCourse = await Course.create(course);
        return { error: false, msg: "Course created successfully", obj: createdCourse };
    } catch (error) {
        console.error('Error during course creation:', error);
        return { error: true, msg: "Error creating course" };
    }
}

async function deleteCourse(ID) {
    let course = await Course.findByPk(ID);
    return await course.destroy();
}

async function getCoursesByStudent(studentId) {
    if (studentId) {
        return await Course.findAll({ where: { StudentID: studentId } }); 
    } else {
        return await Course.findAll();
    }
}

export {
    getCourses,
    getCourseById,
    createCourse,
    deleteCourse,
    getCoursesByStudent
};