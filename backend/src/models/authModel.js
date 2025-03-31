import db from '../db/dbConnection.js';

export const isUser = async (username) => {
    const [rows] = await db.execute('SELECT 1 FROM users WHERE BINARY username = ?', [username])
    return rows.length !== 0;
}

export const checkPassword = async (username, password) => {
    const [rows] = await db.execute('SELECT 1 FROM users WHERE BINARY username = ? and BINARY password = ?', [username, password])
    return rows.length !== 0;
}

export const verifyRole = async (username, role) => {
    const [rows] = await db.execute('SELECT role FROM users WHERE username = ?', [username])
    return rows[0].role === role;
}