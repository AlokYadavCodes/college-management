import express from 'express';
import {departments, branches, submit} from "../controllers/registerController.js";

const registerRoutes = express.Router();

registerRoutes.get('/departments', departments)
registerRoutes.get('/branches/:departmentId', branches)
registerRoutes.post('/submit', submit)

export default registerRoutes;