import express from 'express';
import {profile} from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.post('/profile', profile)

export default adminRoutes;