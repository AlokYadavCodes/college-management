import db from '../db/dbConnection.js'

export const getSemestersArr = async (userId) => {
    const [rows] = await db.execute(`SELECT sem.semester_number
                                     FROM users u
                                              JOIN students s on s.user_id = u.id
                                              JOIN semesters sem on sem.id = s.semester_id
                                     WHERE u.id = ?`, [userId])
    return Array.from({length: rows[0].semester_number - 1}, (_, i) => i + 1);

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