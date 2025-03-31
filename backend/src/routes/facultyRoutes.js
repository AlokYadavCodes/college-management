import express from 'express';
import {
    profile,
    branches,
    semesters,
    subjects,
    students,
    uploadMarks,
    addMaterial,
    getMaterials,
    getClasses,
    getClassesNo,
    getMaterialsNo,
} from "../controllers/facultyController.js";

const facultyRoutes = express.Router();

facultyRoutes.post('/profile', profile)
facultyRoutes.post('/branches', branches)
facultyRoutes.post('/semesters', semesters)
facultyRoutes.post('/subjects', subjects)
facultyRoutes.post('/students', students)
facultyRoutes.post('/upload-marks', uploadMarks)
facultyRoutes.post('/add-material', addMaterial)
facultyRoutes.get('/get-materials/:userId', getMaterials)
facultyRoutes.get('/get-classes/:userId', getClasses)
facultyRoutes.get('/get-classes-no/:userId', getClassesNo)
facultyRoutes.get('/get-materials-no/:userId', getMaterialsNo)


export default facultyRoutes;