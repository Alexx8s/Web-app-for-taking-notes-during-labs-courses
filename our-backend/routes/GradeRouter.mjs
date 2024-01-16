import express from 'express';
import {
    getGrades as getGradesFunction,
    getGradeById as getGradeByIdFunction,
    deleteGrade as deleteGradeFunction,
    createGrade as createGradeFunction,
    updateGrade as updateGradeFunction,
    getGradesWithFilterAndPagination as getGradesWithFilterAndPaginationFunction,
    getGradesByStudentId as getGradesByStudentIdFunction,
} from "../Dataaccess/GradeDA.mjs";

let gradeRouter = express.Router();

gradeRouter.route("/grade")
    .post(async (req, res) => {
        return res.status(201).json(await createGradeFunction(req.body));
    });

gradeRouter.route("/grades")
    .get(async (req, res) => {
        return res.json(await getGradesFunction());
    });

gradeRouter.route("/grade/:id")
    .get(async (req, res) => {
        return res.json(await getGradeByIdFunction(req.params.id));
    })
    .delete(async (req, res) => {
        return res.json(await deleteGradeFunction(req.params.id));
    })
    .put(async (req, res) => {
        let ret = await updateGradeFunction(req.params.id, req.body);

        if (ret.error)
            res.status(400).json(ret.msg);
        else
            res.status(200).json(ret.obj)
    });

gradeRouter.route('/grade/gradeFilter/:id')
    .get(async (req, res) => {
        return res.json(await getGradesWithFilterAndPaginationFunction(req.query));
    });

gradeRouter.route('/grade/gradeUser/:id')
    .get(async (req, res) => {
        return res.json(await getGradesByUserIdFunction(req.params.id));
    });

// gradeRouter.route("/grade/:id/tags")
//     .get(async (req, res) => {
//         return res.json(await getTagsByGradeIdFunction(req.params.id));
//     });

export default gradeRouter;