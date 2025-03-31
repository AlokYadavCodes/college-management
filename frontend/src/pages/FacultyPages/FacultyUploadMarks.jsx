import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

function FacultyUploadMarks() {

    const [branchOptions, setBranchOptions] = useState([]);
    const [branch, setBranch] = useState();

    const [semesterOptions, setSemesterOptions] = useState([]);
    const [semester, setSemester] = useState();

    const [subjectOptions, setSubjectOptions] = useState([]);
    const [subject, setSubject] = useState();

    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [updatedStudents, setUpdatedStudents] = useState([]);
    const [markSubmitted, setMarkSubmitted] = useState(false);

    const {userId} = useSelector(state => state.user)
    // for branch options
    useEffect(() => {
        fetch('/api/faculty/branches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
            })
        })
            .then(res => res.json())
            .then((data) => {
                setBranchOptions(data)
            })
            .catch(err => console.log(`Error in fetching branches: ${err.message}`))
    }, [userId])

    // for semester options
    useEffect(() => {
        if (!branch) return;
        fetch('/api/faculty/semesters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branchId: branch.id,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then((data) => setSemesterOptions(data))
            .catch(err => console.log(`Error in fetching semesters: ${err.message}`))
    }, [branch, userId])

    // for subject options
    useEffect(() => {
        if (!branch || !semester) return;

        fetch('/api/faculty/subjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                branchId: branch.id,
                semesterId: semester.id
            })
        })
            .then(res => res.json())
            .then((data) => setSubjectOptions(data))
            .catch(err => console.log(`Error in fetching subjects: ${err.message}`))
    }, [branch, semester, userId])

    // for fetching students
    useEffect(() => {
        if (!branch || !semester || !subject) return;

        fetch('/api/faculty/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                branchId: branch.id,
                semesterId: semester.id,
                subjectId: subject.id,
            })
        })
            .then(res => res.json())
            .then(data => {
                setStudents(data)
            })
            .catch(err => console.log(`Error in fetching students: ${err.message}`))
            .finally(() => setMarkSubmitted(false))
    }, [branch, semester, subject, userId, markSubmitted])

    const handleBranchChange = (e) => {
        setUpdatedStudents([])
        const name = e.target.value;
        const branch = branchOptions.find((branch) => branch.name === name)
        setSemester('')
        setSubject('')
        setBranch(branch)
    }

    const handleSemesterChange = (e) => {
        setUpdatedStudents([])
        const number = Number(e.target.value);
        const semester = semesterOptions.find((semester) => semester.number === number)
        setSubject('')
        setSemester(semester)
    }

    const handleSubjectChange = (e) => {
        setUpdatedStudents([])
        const name = e.target.value;
        const subject = subjectOptions.find((subject) => subject.name === name)
        setSubject(subject)
    }

    const handleMarksChange = (studentId, marks) => {
        setUpdatedStudents((prev) => {
                if (prev.some(student => student.id === studentId)) {
                    return prev.map((student) => student.id === studentId ? {...student, marks: marks} : student)
                } else {
                    return [...prev, {id: studentId, marks}]
                }
            }
        );
        console.log(updatedStudents)
    };

    const handleSubmitMarks = () => {
        if (updatedStudents.length === 0) {
            toast.error('Enter marks for at least one student')
            return;
        }
        console.log(`inside handle submit marks`)
        fetch('/api/faculty/upload-marks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                updatedStudents,
                branchId: branch.id,
                semesterId: semester.id,
                subjectId: subject.id,
            })
        })
            .then(res => res.json())
            .then((data) => {
                data.success ? toast.success(data.message) : toast.error(data.message)
                setUpdatedStudents([])
                setMarkSubmitted(true)
            })

    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isFormValid = branch && semester && subject;
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
        Upload Marks
    </span>
            </h1>


            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Input Details Box */}
                <div className="bg-white shadow-xl rounded-xl p-8 transition duration-300 hover:shadow-2xl">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Details</h2>
                    <div className="space-y-6">
                        {/* Branch Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="branch">
                                Branch
                            </label>
                            <select
                                id="branch"
                                value={branch?.name || ''}
                                onChange={handleBranchChange}
                                className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-500"
                            >
                                <option value="">-- Select Branch --</option>
                                {branchOptions.map((branch) => (
                                    <option key={branch.id} value={branch.name}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Semester Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="semester">
                                Semester
                            </label>
                            <select
                                id="semester"
                                value={semester?.number || ''}
                                onChange={handleSemesterChange}
                                className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-500"
                            >
                                <option value="">-- Select Semester --</option>
                                {semesterOptions.map((semester) => (
                                    <option key={semester.id} value={semester.number}>
                                        {semester.number}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subject Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2" htmlFor="subject">
                                Subject
                            </label>
                            <select
                                id="subject"
                                value={subject?.name || ''}
                                onChange={handleSubjectChange}
                                className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-500"
                            >
                                <option value="">-- Select Subject --</option>
                                {subjectOptions.map((subject) => (
                                    <option key={subject.id} value={subject.name}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Students List Box */}
                {isFormValid && (
                    <div className="bg-white shadow-xl rounded-xl p-8 transition duration-300 hover:shadow-2xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Students</h2>

                        {/* Search Bar */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-500"
                            />
                        </div>

                        {/* Student List Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse rounded-lg shadow-sm">
                                <thead>
                                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                                    <th className="px-6 py-3 border-b">College Roll No.</th>
                                    <th className="px-6 py-3 border-b">Name</th>
                                    <th className="px-6 py-3 border-b">Marks</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="border-b hover:bg-gray-50 transition duration-150">
                                        <td className="px-6 py-4 border-b">{student.id}</td>
                                        <td className="px-6 py-4 border-b">{student.name}</td>
                                        <td className="px-6 py-4 border-b">
                                            {student.marks !== null ? (
                                                <span className="text-green-500 font-semibold">
                                            {student.marks} (Submitted)
                                        </span>
                                            ) : (
                                                <input
                                                    type="number"
                                                    min='0'
                                                    max='100'
                                                    value={(updatedStudents?.find(s => s?.id == student?.id))?.marks}
                                                    onChange={(e) => {
                                                        const value = Math.min(100, e.target.value);
                                                        handleMarksChange(student.id, value);
                                                    }}
                                                    className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-500"
                                                    placeholder="Enter Marks"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 text-right">
                            <button
                                onClick={handleSubmitMarks}
                                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500 focus:ring focus:ring-green-300 transition duration-200"
                            >
                                Submit Marks
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FacultyUploadMarks;
