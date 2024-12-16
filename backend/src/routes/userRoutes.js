import express from 'express';
import {checkUsername, registerUser, checkEmail} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/check-username', checkUsername)
userRoutes.get('/check-email', checkEmail)
userRoutes.post('/register', registerUser)

export default userRoutes;