import express from 'express';
import {profile} from "../controllers/facultyController.js";

const facultyRoutes = express.Router();

facultyRoutes.post('/profile', profile)

export default facultyRoutes;