import express from 'express';
import db from './db/dbConnection.js';
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', async (req, res) => {
    const [[users]]= await db.execute('SELECT name FROM users where id=1');
    console.log(users)
    res.json(users);
});
