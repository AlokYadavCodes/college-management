import React, {useEffect, useState} from "react";

function FacultyUploadMarks() {

    const [branchOptions, setBranchOptions] = useState([]);
    const [branch, setBranch] = useState();

    const [semesterOptions, setSemesterOptions] = useState([]);
    const [semester, setSemester] = useState();

    const [subjectOptions, setSubjectOptions] = useState([]);
    const [subject, setSubject] = useState();

    const [students, setStudents] = useState([
        {id: 1, name: "Student A", roll: "101", marks: ""},
        {id: 2, name: "Student B", roll: "102", marks: 85},
        {id: 3, name: "Student C", roll: "103", marks: ""},
    ]);
    const [searchQuery, setSearchQuery] = useState("");

    // for branch options
    useEffect(() => {
        fetch('/api/faculty/branches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 3
            })
        })
            .then(res => res.json())
            .then((data) => {
                setBranchOptions(data)
            })
            .catch(err => console.log(`Error in fetching branches: ${err.message}`))
    }, [])

    // for semester options
    useEffect(() => {
        if (!branch) return;
        fetch('/api/faculty/semesters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branchId: 1,
                userId: 3
            })
        })
            .then(res => res.json())
            .then((data) => setSemesterOptions(data))
            .catch(err => console.log(`Error in fetching semesters: ${err.message}`))
    }, [branch])

    // for subject options
    useEffect(() => {
        if (!branch || !semester) return;

        fetch('/api/faculty/subjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 3,
                branchId: branch.id,
                semesterId: semester.id
            })
        })
            .then(res => res.json())
            .then((data) => setSubjectOptions(data))
            .catch(err => console.log(`Error in fetching subjects: ${err.message}`))
    }, [branch, semester])

    // for fetching students
    useEffect(() => {
        if (!branch || !semester || !subject) {
            console.log(`returned from fetch students`)
            return;
        }
        fetch('/api/faculty/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 3,
                branchId: 2,
                semesterId: 3,
                subjectId: 11,
            })
        })
            .then(res => res.json())
            .then(data => {
                setStudents(data)
                console.log(data)
            })
            .catch(err => console.log(`Error in fetching students: ${err.message}`))
    }, [branch, semester, subject])

    const handleBranchChange = (e) => {
        const name = e.target.value;
        const branch = branchOptions.find((branch) => branch.name === name)
        setBranch(branch)
    }

    const handleSemesterChange = (e) => {
        const number = Number(e.target.value);
        const semester = semesterOptions.find((semester) => semester.number === number)
        setSemester(semester)
    }

    const handleSubjectChange = (e) => {
        const name = e.target.value;
        const subject = subjectOptions.find((subject) => subject.name === name)
        setSubject(subject)
    }

    const handleMarksChange = (studentId, marks) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === studentId ? {...student, marks} : student
            )
        );
    };

    const handleSubmitMarks = () => {
        // fetch('/api/faculty/upload-marks', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify()
        // })

        console.log("Uploaded Marks:", students);
        alert("Marks uploaded successfully!");
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isFormValid = true

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Faculty: Upload Marks
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Input Details Box */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Details</h2>
                    <div className="space-y-4 flex flex-col">
                        {/* Branch Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="branch">
                                Branch
                            </label>
                            <select
                                id="branch"
                                value={branch?.name || ''}
                                onChange={handleBranchChange}
                                className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Select Branch --</option>
                                {
                                    branchOptions.map((branch) => (
                                        <option key={branch.id} value={branch.name}>{branch.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* Semester Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="semester">
                                Semester
                            </label>
                            <select
                                id="semester"
                                value={semester?.number}
                                onChange={handleSemesterChange}
                                className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Select Semester --</option>
                                {
                                    semesterOptions.map((semester) => (
                                        <option key={semester.id} value={semester.number}>{semester.number}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* Subject Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="subject">
                                Subject
                            </label>
                            <select
                                id="subject"
                                value={subject?.name}
                                onChange={handleSubjectChange}
                                className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Select Subject --</option>
                                {
                                    subjectOptions.map((subject) => (
                                        <option key={subject.id} value={subject.name}>{subject.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>

                {/* Students List Box */}
                {isFormValid && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-700 mb-4">Students</h2>

                        {/* Search Bar */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Student List Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-gray-50 text-gray-700 uppercase text-sm">
                                    <th className="px-4 py-2 border">Roll Number</th>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Marks</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 border">{student.id}</td>
                                        <td className="px-4 py-2 border">{student.name}</td>
                                        <td className="px-4 py-2 border">
                                            {student.marks !== "" ? (
                                                <span className="text-green-500 font-medium">
                                                        {student.marks} (Submitted)
                                                    </span>
                                            ) : (
                                                <input
                                                    type="number"
                                                    value={student.marks || ""}
                                                    onChange={(e) =>
                                                        handleMarksChange(student.id, e.target.value)
                                                    }
                                                    className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
                        <div className="mt-4 text-right">
                            <button
                                onClick={handleSubmitMarks}
                                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 focus:ring focus:ring-green-300"
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
