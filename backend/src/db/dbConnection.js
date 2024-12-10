import mysql from 'mysql2';
const pool= mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alok@1122',
    database: 'college_management'
})

export default pool.promise();