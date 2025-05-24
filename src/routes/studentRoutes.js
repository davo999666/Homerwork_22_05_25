import express from "express";
import {
    addScore,
    addStudent, countByNames, deleteStudent, findByMinScore, findByName, findStudent, updateStudent,

} from "../controller/studentController.js";

const router = express.Router();

router.post('/student', addStudent);
router.get('/student/:id', findStudent);
router.delete('/student/:id', deleteStudent);
router.patch('/student/:id', updateStudent);
router.patch('/score/student/:id', addScore);
router.get('/students/name/:name', findByName);
router.get('/quantity/students', countByNames);
router.get('/students/exam/:exam/minScore/:minScore', findByMinScore);


export default router;