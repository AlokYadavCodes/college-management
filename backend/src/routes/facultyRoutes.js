import express from 'express';
import {profile, branches, semesters, subjects, students} from "../controllers/facultyController.js";

const facultyRoutes = express.Router();

facultyRoutes.post('/profile', profile)
facultyRoutes.post('/branches', branches)
facultyRoutes.post('/semesters', semesters)
facultyRoutes.post('/subjects', subjects)
facultyRoutes.post('/students', students)


export default facultyRoutes;