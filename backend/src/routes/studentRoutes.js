import express from 'express';
import {semesters, result, profile, getMaterials, getSubjects} from "../controllers/studentController.js";

const studentRoutes = express.Router();

studentRoutes.post('/semesters', semesters)
studentRoutes.post('/result', result)
studentRoutes.post('/profile', profile)
studentRoutes.get('/get-materials/:userId', getMaterials)
studentRoutes.get('/get-subjects/:userId', getSubjects)

export default studentRoutes;