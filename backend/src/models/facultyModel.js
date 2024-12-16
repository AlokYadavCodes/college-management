import db from "../db/dbConnection.js";

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
    console.log(`userId: ${userId}, branchId: ${branchId}, semesterId: ${semesterId}, subjectId: ${subjectId}`)
    const [rows] = await db.execute(`SELECT DISTINCT u.name as name, s.id as id, r.obtained_marks as marks
                                     FROM students s
                                              JOIN users u ON u.id = s.user_id
                                              LEFT JOIN results r ON r.student_id = s.id
                                              JOIN branch_semester_subjects bss ON bss.id = r.branch_semester_subject_id
                                     WHERE bss.branch_id = ?
                                       AND bss.semester_id = ?
                                       AND bss.subject_id = ?
                                       AND s.semester_id = ?
    `, [branchId, semesterId, subjectId, semesterId])
    return rows;
}