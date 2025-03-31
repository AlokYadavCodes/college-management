import db from "../db/dbConnection.js";

const getFacultyId = async (userId) => {
    const [rows] = await db.execute(`SELECT f.id AS facultyId
                                     FROM faculties f
                                              JOIN users u on u.id = f.user_id
                                     WHERE u.id = ?
    `, [userId])
    return rows[0].facultyId;
}

export const getBranches = async (userId) => {
    const [rows] = await db.execute(`SELECT DISTINCT b.name as name, b.id as id
                                     FROM branches b
                                              JOIN branch_semester_subjects bss ON bss.branch_id = b.id
                                              JOIN faculty_teaches ft ON ft.branch_semester_subject_id = bss.id
                                              JOIN faculties f ON f.id = ft.faculty_id
                                              JOIN users u ON u.id = f.user_id
                                     WHERE u.id = ?
    `, [userId])
    return rows;
}

export const getSemesters = async (userId, branchId) => {
    const [rows] = await db.execute(`SELECT DISTINCT sem.semester_number as number, sem.id as id
                                     FROM semesters sem
                                              JOIN branch_semester_subjects bss ON bss.semester_id = sem.id
                                              JOIN faculty_teaches ft ON ft.branch_semester_subject_id = bss.id
                                              JOIN faculties f ON f.id = ft.faculty_id
                                              JOIN users u ON u.id = f.user_id
                                     WHERE u.id = ?
                                       AND bss.branch_id = ?

    `, [userId, branchId])
    return rows
}

export const getSubjects = async (userId, branchId, semesterId) => {
    const [rows] = await db.execute(`SELECT DISTINCT sub.name as name, sub.id as id
                                     FROM subjects sub
                                              JOIN branch_semester_subjects bss ON bss.subject_id = sub.id
                                              JOIN faculty_teaches ft ON ft.branch_semester_subject_id = bss.id
                                              JOIN faculties f ON f.id = ft.faculty_id
                                              JOIN users u ON u.id = f.user_id
                                     WHERE u.id = ?
                                       AND bss.branch_id = ?
                                       AND bss.semester_id = ?
    `, [userId, branchId, semesterId])
    return rows;
}

export const getStudents = async (userId, branchId, semesterId, subjectId) => {
    const [rows] = await db.execute(`SELECT u.name as name, s.id as id, r.obtained_marks as marks
                                     FROM users u
                                              JOIN students s ON s.user_id = u.id
                                              JOIN branch_semester_subjects bss
                                                   ON s.branch_id = bss.branch_id AND s.semester_id = bss.semester_id
                                              LEFT JOIN results r
                                                        ON r.student_id = s.id AND r.branch_semester_subject_id = bss.id
                                     WHERE s.branch_id = ?
                                       AND s.semester_id = ?
                                       AND bss.subject_id = ?
    `, [branchId, semesterId, subjectId])
    return rows;
}

export const facultyUploadMarks = async (updatedStudents, branchId, semesterId, subjectId) => {
    console.log(`inside upload marks function`)
    try {
        const [rows] = await db.execute(`SELECT id
                                         FROM branch_semester_subjects
                                         WHERE branch_id = ?
                                           and semester_id = ?
                                           and subject_id = ?
        `, [branchId, semesterId, subjectId])
        const branch_semester_subject_id = rows[0].id;

        console.log(updatedStudents)
        for (const student of updatedStudents) {
            if (!student.marks) continue
            await db.execute(`INSERT INTO results (student_id, branch_semester_subject_id, obtained_marks)
                              values (?, ?, ?)
            `, [student.id, branch_semester_subject_id, student.marks])
            console.log(`updated marks for student_id: ${student.id}`)
        }
        return ({
            success: true,
            message: 'Marks uploaded successfully',
        })
    } catch (error) {
        console.error(`error in uploading marks: ${error}`);
        return ({
            success: false,
            message: 'Error in uploading marks'
        })
    }

}

export const facultyAddMaterial = async (userId, branchId, semesterId, title, description) => {
    try {
        await db.execute(`INSERT INTO materials(title, description, created_by, branch_id, semester_id)
                          values (?, ?, ?, ?, ?)
        `, [title, description, userId, branchId, semesterId])

        return ({
            success: true,
            message: 'Material added successfully'
        })
    } catch (error) {
        console.error(`error in adding materials: ${error}`);
        return ({
            success: false,
            message: 'Error in adding materials'
        })
    }
}

export const getFacultyMaterials = async (userId) => {
    try {
        const [rows] = await db.execute(`SELECT id, title, description, created_at as createdAt
                                         FROM materials
                                         WHERE expiry_date >= current_date()
                                           AND created_by = ?
        `, [userId])
        return (rows)
    } catch (error) {
        console.log(`error in fetching faculty material: ${error}`);
    }
}

export const getFacultyClasses = async (userId) => {
    const facultyId = await getFacultyId(userId)
    const [rows] = await db.execute(`
        SELECT d.name AS department,
               JSON_ARRAYAGG(
                       JSON_OBJECT(
                               'name', b.name,
                               'semesters', (SELECT JSON_ARRAYAGG(
                                                            JSON_OBJECT(
                                                                    'number', sem.semester_number,
                                                                    'subjects', (SELECT JSON_ARRAYAGG(sub.name)
                                                                                 FROM subjects sub
                                                                                 WHERE sub.id IN (SELECT bss.subject_id
                                                                                                  FROM branch_semester_subjects bss
                                                                                                           JOIN faculty_teaches ft
                                                                                                                ON ft.branch_semester_subject_id = bss.id
                                                                                                  WHERE bss.branch_id = b.id
                                                                                                    AND bss.semester_id = sem.id
                                                                                                    AND ft.faculty_id = ?))
                                                            )
                                                    )
                                             FROM semesters sem
                                             WHERE sem.id IN (SELECT bss.semester_id
                                                              FROM branch_semester_subjects bss
                                                                       JOIN faculty_teaches ft
                                                                            ON ft.branch_semester_subject_id = bss.id
                                                              WHERE bss.branch_id = b.id
                                                                AND ft.faculty_id = ?))
                       )
               )      AS branches
        FROM departments d
                 JOIN branches b ON b.department_id = d.id
        WHERE EXISTS (SELECT 1
                      FROM branch_semester_subjects bss
                               JOIN faculty_teaches ft
                                    ON ft.branch_semester_subject_id = bss.id
                      WHERE bss.branch_id = b.id
                        AND ft.faculty_id = ?)
        GROUP BY d.id;

    `, [facultyId, facultyId, facultyId]);
    return rows;
};

export const getFacultyClassesNo = async (userId) => {
    const facultyId = await getFacultyId(userId)
    const [rows] = await db.execute(`
        SELECT COUNT(*) AS totalClasses
        FROM faculty_teaches ft
                 JOIN faculties f ON f.id = ft.faculty_id
        WHERE f.id = ?
        GROUP BY f.id
    `, [facultyId])

    return rows[0].totalClasses
}

export const getFacultyMaterialsNo = async (userId) => {
    const [rows] = await db.execute(`
        SELECT COUNT(*) as totalMaterials
        FROM materials
        WHERE expiry_date >= current_date()
          AND created_by = ?
    `, [userId])
    return rows[0].totalMaterials
}