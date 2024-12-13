import db from '../db/dbConnection.js';

export const getUserDetails = async (username) => {
    const [userDetail] = await db.execute('SELECT id, name, role FROM users WHERE username = ?', [username])
    return userDetail[0];
}

export const usernameExists = async (username) => {
    const [rows] = await db.execute('SELECT 1 FROM users WHERE username = ?', [username])
    return rows.length !== 0;
}

export const getUserProfile = async (userId) => {
    const [userDetail] = await db.execute('SELECT name, dob, father_name as fatherName, email, contact_no as contactNo, parent_contact_no as parentContactNo, address FROM users WHERE id = ?', [userId])
    return userDetail[0];
}

