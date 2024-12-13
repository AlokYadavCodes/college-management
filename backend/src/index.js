import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/student', studentRoutes)
app.use('/faculty', facultyRoutes)
app.use('/admin', adminRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});