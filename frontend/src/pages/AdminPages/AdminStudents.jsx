import React, {useState} from 'react';

const AdminStudents = () => {
    // Sample student data
    const students = [
        {id: 1, name: 'Amit Kumar', branch: 'CSE'},
        {id: 2, name: 'Sneha Sharma', branch: 'ECE'},
        {id: 3, name: 'Rahul Verma', branch: 'Mechanical'},
        {id: 4, name: 'Priya Singh', branch: 'CSE'},
        {id: 5, name: 'Anjali Gupta', branch: 'Civil'},
        {id: 6, name: 'Vikash Yadav', branch: 'ECE'},
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');

    const filteredStudents = students.filter((student) => {
        const matchesBranch = selectedBranch ? student.branch === selectedBranch : true;
        const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesBranch && matchesName;
    });

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Students</h2>

            {/* Search Input */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pl-12 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute top-4 left-4 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zm-6 8a6 6 0 1111.293 3.707l3.707 3.707a1 1 0 01-1.414 1.414l-3.707-3.707A6 6 0 012 12z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {/* Dropdown Filter */}
            <div className="relative mb-6">
                <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="">All Branches</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                </select>
            </div>

            {/* Students List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredStudents.map((student) => (
                    <div
                        key={student.id}
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.branch}</p>
                    </div>
                ))}
            </div>

            {filteredStudents.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No students found.</p>
            )}
        </div>
    );
};

export default AdminStudents;
