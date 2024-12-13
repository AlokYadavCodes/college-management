import express from 'express';
import {checkUsername, registerUser} from "../controllers/userController.js";
const userRoutes = express.Router();

userRoutes.get('/check-username',checkUsername )
userRoutes.post('/register', registerUser)

export default userRoutes;