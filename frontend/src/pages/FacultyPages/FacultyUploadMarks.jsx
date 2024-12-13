import React, {useEffect, useState} from "react";

function FacultyUploadMarks() {

    const [branchOptions, setBranchOptions] = useState([]);
    const [branchId, setBranchId] = useState(0);

    const [semesterOptions, setSemesterOptions] = useState([]);
    const [semesterId, setSemesterId] = useState("");

    const [subjectOptions, setSubjectOptions] = useState([]);
    const [subjectId, setSubjectId] = useState(0);

    const [students, setStudents] = useState([
        {id: 1, name: "Student A", roll: "101", marks: ""},
        {id: 2, name: "Student B", roll: "102", marks: 85},
        {id: 3, name: "Student C", roll: "103", marks: ""},
    ]);
    const [searchQuery, setSearchQuery] = useState("");

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
            .then((data) => setBranchOptions(data))
    })

    const handleMarksChange = (studentId, marks) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === studentId ? {...student, marks} : student
            )
        );
    };

    const handleSubmitMarks = () => {
        console.log("Uploaded Marks:", students);
        alert("Marks uploaded successfully!");
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Check if all options are selected
    const isFormValid = branch && semester && subject;

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
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Select Branch --</option>
                                <option value="CSE">Computer Science</option>
                                <option value="ECE">Electronics</option>
                                <option value="MECH">Mechanical</option>
                            </select>
                        </div>

                        {/* Semester Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="semester">
                                Semester
                            </label>
                            <select
                                id="semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Select Semester --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>

                        {/* Subject Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="subject">
                                Subject
                            </label>
                            <select
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Select Subject --</option>
                                <option value="Math">Math</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
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
                                        <td className="px-4 py-2 border">{student.roll}</td>
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
