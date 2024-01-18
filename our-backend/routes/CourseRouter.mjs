import express from 'express';
import {
    getCourses as getCoursesFunction,
    getCourseById as getCourseByIdFunction,
    createCourse as createCourseFunction,
    deleteCourse as deleteCourseFunction,
    getCoursesByStudent as getCoursesByStudentFunction
} from "../dataAccess/CourseDA.mjs";

let courseRouter = express.Router();

courseRouter.route("/course")
    .post(async (req, res) => {
        return res.status(201).json(await createCourseFunction(req.body));
    });

courseRouter.route("/courses")
    .get(async (req, res) => {
        return res.json(await getCoursesFunction());
    });

courseRouter.route("/course/:id")
    .get(async (req, res) => {
        return res.json(await getCourseByIdFunction(req.params.id));
    })
    .delete(async (req, res) => {
        return res.json(await deleteCourseFunction(req.params.id));
    });

courseRouter.route("/courses/:id")
    .get(async (req, res) => {
        return res.json(await getCoursesByStudentFunction(req.params.id));
    });

export default courseRouter;