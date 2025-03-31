import db from '../db/dbConnection.js'

const getBranchId = async (userId) => {
    const [rows] = await db.execute(`SELECT s.branch_id
                                     FROM students s
                                              JOIN users u on u.id = s.user_id
                                     WHERE u.id = ?
    `, [userId])

    return rows[0].branch_id;
}

const getSemesterId = async (userId) => {
    const [rows] = await db.execute(`SELECT s.semester_id
                                     FROM students s
                                              JOIN users u on u.id = s.user_id
                                     WHERE u.id = ?
    `, [userId])

    return rows[0].semester_id;
}

export const getSemestersArr = async (userId) => {
    const [rows] = await db.execute(`SELECT sem.semester_number
                                     FROM users u
                                              JOIN students s on s.user_id = u.id
                                              JOIN semesters sem on sem.id = s.semester_id
                                     WHERE u.id = ?`, [userId])
    return Array.from({length: rows[0].semester_number}, (_, i) => i + 1);

}

export const getResult = async (userId, semester) => {
    let [subjects] = await db.execute(`SELECT sub.name         as name,
                                              sub.max_marks    as maxMarks,
                                              r.obtained_marks as obtainedMarks
                                       FROM results r
                                                JOIN students s on s.id = r.student_id
                                                JOIN users u on u.id = s.user_id
                                                JOIN branch_semester_subjects bss on bss.id = r.branch_semester_subject_id
                                                JOIN subjects sub on sub.id = bss.subject_id
                                                JOIN semesters sem on sem.id = bss.semester_id
                                       WHERE u.id = ?
                                         and sem.semester_number = ?`, [userId, semester]);
    const PASSING_PERCENTAGE = 33;
    subjects = subjects.map(subject => {
        if ((subject.obtainedMarks / subject.maxMarks) * 100 >= PASSING_PERCENTAGE) {
            return {...subject, resultStatus: 'Pass'}
        } else {
            return {...subject, resultStatus: 'Fail'}
        }
    })
    const grandTotal = subjects.reduce((acc, currVal) => acc + currVal.maxMarks, 0)
    const totalObtainedMarks = subjects.reduce((acc, currVal) => acc + currVal.obtainedMarks, 0)
    const percentage = (totalObtainedMarks / grandTotal) * 100
    const totalSubjects = subjects.length
    const resultStatus = percentage >= PASSING_PERCENTAGE ? 'Pass' : 'Fail'

    return {
        subjects,
        grandTotal,
        totalObtainedMarks,
        percentage,
        resultStatus,
        totalSubjects,
    };
}

export const getStudentProfile = async (userId) => {
    const [rows] = await db.execute(`SELECT d.name              as departmentName,
                                            b.name              as branchName,
                                            sem.semester_number as semesterNumber
                                     FROM users u
                                              JOIN students s on s.user_id = u.id
                                              JOIN departments d on d.id = s.department_id
                                              JOIN branches b on b.id = s.branch_id
                                              JOIN semesters sem on sem.id = s.semester_id
                                     WHERE u.id = ?
    `, [userId])
    return rows[0];
}

export const getStudentMaterials = async (userId) => {
    const branchId = await getBranchId(userId);
    const semesterId = await getSemesterId(userId);
    try {
        const [rows] = await db.execute(`SELECT m.title,
                                                m.description,
                                                m.created_at as createdAt,
                                                u.name       as createdBy
                                         FROM materials m
                                                  JOIN users u ON u.id = m.created_by
                                         WHERE m.branch_id = ?
                                           AND m.semester_id = ?
        `, [branchId, semesterId])
        console.log(rows)
        return rows;
    } catch (error) {
        console.log(`error in fetching student materials: ${error}`);
    }
}

export const getStudentSubjects = async (userId) => {
    const branchId = await getBranchId(userId);
    const semesterId = await getSemesterId(userId);
    try {
        const [rows] = await db.execute(`SELECT sub.id AS id, sub.name AS name, u.name AS faculty, f.id AS facultyId
                                         FROM subjects sub
                                                  JOIN branch_semester_subjects bss ON bss.subject_id = sub.id
                                                  JOIN faculty_teaches ft ON ft.branch_semester_subject_id = bss.id
                                                  JOIN faculties f ON f.id = ft.faculty_id
                                                  JOIN users u on u.id = f.user_id
                                         WHERE bss.branch_id = ?
                                           AND bss.semester_id = ?

        `, [branchId, semesterId])
        console.log(rows)
        return rows;

    } catch (error) {
        console.log(`error in fetching students subjects : ${error}`)
    }

}