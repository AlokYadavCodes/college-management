import db from '../db/dbConnection.js'

export const getDepartments = async () => {
    const [rows] = await db.execute('SELECT d.id as id, d.name as name FROM departments d')
    return rows;
}

export const getBranches = async (departmentId) => {
    const [rows] = await db.execute(`SELECT b.id as id, b.name as name
                                     FROM branches b
                                     WHERE b.department_id = ?`, [departmentId])
    return rows;
}

export const submitRequest = async (formData) => {
    console.log(formData);
    const {
        name,
        username,
        password,
        email,
        contact_no,
        dob,
        address,
        father_name,
        parent_contact_no,
        department_id,
        branch_id,
        semester_id
    } = formData;
    try {
        await db.execute(`INSERT INTO registration_requests(name, username, password, email, contact_no, dob,
                                                            address,
                                                            father_name, parent_contact_no, department_id,
                                                            branch_id,
                                                            semester_id)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                  ?)`, [name, username, password, email, contact_no, dob, address, father_name, parent_contact_no, department_id, branch_id, semester_id])
        return {
            message: 'Request submitted successfully'
        }
    } catch (error) {
        console.log(`error in submitting request: ${error}`);
        return {
            message: 'Error in submitting request'
        }
    }


}