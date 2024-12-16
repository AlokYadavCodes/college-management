import db from '../db/dbConnection.js'

export const getTotalStudentsNo = async () => {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM students')
    return rows[0].total;
}

export const getTotalFacultiesNo = async () => {
    const [rows] = await db.execute('SELECT COUNT(*) as total FROM faculties')
    return rows[0].total;
}

export const getTotalPendingRequestsNo = async () => {
    const [rows] = await db.execute(`SELECT COUNT(*) as total
                                     FROM registration_requests
                                     WHERE status = 'pending'`)
    return rows[0].total;
}

export const getPendingRegistrationStudents = async () => {
    const [rows] = await db.execute(`SELECT rr.name              as name,
                                            rr.email             as email,
                                            rr.dob               as dob,
                                            rr.father_name       as fatherName,
                                            rr.contact_no        as contactNo,
                                            rr.parent_contact_no as parentContactNo,
                                            rr.address           as address,
                                            d.name               as department,
                                            b.name               as branch,
                                            sem.semester_number  as semester,
                                            rr.id                as id
                                     FROM registration_requests rr
                                              JOIN departments d on d.id = rr.department_id
                                              JOIN branches b on b.id = rr.branch_id
                                              JOIN semesters sem on sem.id = rr.semester_id
                                     WHERE rr.status = 'pending'
    `)
    return rows;
}

export const getAllBranches = async () => {
    const [rows] = await db.execute('SELECT b.name as name FROM branches b')
    return rows;
}

export const acceptRegistration = async (id) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        await connection.execute(`UPDATE registration_requests
                                  SET status = 'accepted'
                                  WHERE id = ?`, [id])

        const [rows] = await connection.execute(`
                    SELECT name,
                           username,
                           email,
                           password,
                           dob,
                           father_name,
                           contact_no,
                           parent_contact_no,
                           address,
                           department_id,
                           branch_id,
                           semester_id
                    FROM registration_requests
                    WHERE id = ?`,
            [id]
        );
        const {
            name,
            username,
            email,
            password,
            dob,
            father_name,
            contact_no,
            parent_contact_no,
            address,
            department_id,
            branch_id,
            semester_id
        } = rows[0];
        const role = 'student';

        const [result1] = await connection.execute(`INSERT INTO users(name, username, email, password, role, dob,
                                                                      father_name,
                                                                      contact_no,
                                                                      parent_contact_no, address)
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [name, username, email, password, role, dob, father_name, contact_no, parent_contact_no, address])

        const userId = result1.insertId;

        const [result2] = await connection.execute(`INSERT INTO students(user_id, department_id, branch_id, semester_id, admission_date)
                                                    VALUES (?, ?, ?, ?,
                                                            ?)`, [userId, department_id, branch_id, semester_id, new Date()])
        await connection.commit();
        return {
            message: 'Registration accepted successfully'
        }

    } catch (error) {
        await connection.rollback();
        console.log(`Error in accepting registration request transaction: ${error}`);
        return {
            message: 'Error in accepting registration request'
        }
    }
}

export const rejectRegistration = async (id) => {
    try {
        await db.execute(`UPDATE registration_requests
                          SET status = 'rejected'
                          WHERE id = ?`, [id])
        return {
            message: 'Registration rejected successfully'
        }
    } catch (error) {
        console.log(`Error in rejecting registration request: ${error}`);
        return {
            message: 'Error in rejecting registration request'
        }
    }

}

export const isRegistrationAllowed = async () => {
    const [rows] = await db.execute('SELECT setting_value FROM settings WHERE setting_key = ?', ['isRegistrationAllowed'])
    return rows[0].setting_value;
}

export const setRegistrationAllowed = async (isAllowed) => {
    const value = isAllowed ? 1 : 0;
    try {
        await db.execute(`UPDATE settings
                          SET setting_value = ?
                          WHERE setting_key = 'isRegistrationAllowed'`, [value])
        return {
            message: 'Setting updated successfully'
        }
    } catch (error) {
        console.log(`Error in updating setting: ${error}`);
        return {
            message: 'Error in updating setting'
        }
    }

}