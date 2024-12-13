import express from 'express';
import {semesters, result, profile} from "../controllers/studentController.js";

const studentRoutes = express.Router();

studentRoutes.post('/semesters', semesters)
studentRoutes.post('/result', result)
studentRoutes.post('/profile', profile)

export default studentRoutes;