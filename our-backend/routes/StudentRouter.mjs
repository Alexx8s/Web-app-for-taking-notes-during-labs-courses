import express from 'express';
import {
    getStudents as getStudentsFunction,
    getStudentById as getStudentByIdFunction,
    createStudent as createStudentFunction,
    deleteStudent as deleteStudentFunction,
    updateStudent as updateStudentFunction,
    getStudentByPasswordEmail as getStudentByPasswordEmailFunction
} from "../Dataaccess/StudentDA.mjs";

let studentRouter = express.Router();

studentRouter.route("/student")
    .post(async (req, res) => {
        return res.status(201).json(await createStudentFunction(req.body));
    });

studentRouter.route("/students")
    .get(async (req, res) => {
        return res.json(await getStudentsFunction());
    });

studentRouter.route("/student/:id")
    .get(async (req, res) => {
        return res.json(await getStudentByIdFunction(req.params.id));
    })
    .delete(async (req, res) => {
        return res.json(await deleteStudentFunction(req.params.id));
    })
    .put(async (req, res) => {
        let ret = await updateStudentFunction(req.params.id, req.body);

        if (ret.error)
            res.status(400).json(ret.msg);
        else
            res.status(200).json(ret.obj)
    });

studentRouter.route("/student/signin")
    .post(async (req, res) => {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json("Missing email or password");
            }

            let student = await getStudentByPasswordEmailFunction(req.body.password, req.body.email);

            if (student) {
                return res.status(200).json(student);
            } else {
                return res.status(400).json("Student not found");
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            return res.status(500).json("Internal Server Error");
        }
    });

export default studentRouter;