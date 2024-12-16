import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";

const PendingRegistrationRequest = () => {

    const [students, setStudents] = useState([]);
    const [branchOptions, setBranchOptions] = useState([])
    const [selectedBranch, setSelectedBranch] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetch('/api/admin/all-branches')
            .then(res => res.json())
            .then(data => setBranchOptions(data))
            .catch(err => console.log(`Error in fetching branches: ${err.message}`))
    }, [])

    useEffect(() => {
        fetch('/api/admin/pending-registration')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setStudents(data)
            })
            .catch(err => console.log(`Error in fetching pending registration students: ${err.message}`))
    }, [])

    const filteredStudents = students.filter(student => {
        const isNameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isBranchMatch = selectedBranch === 'All' || student.branch === selectedBranch;
        return isNameMatch && isBranchMatch;
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    const handleAcceptClick = (id) => {
        fetch('/api/admin/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message)
                setStudents(students.filter(student => student.id !== id))
            })
            .catch(err => toast.error(`Error in accepting registration: ${err.message}`))
    }

    const handleRejectClick = (id) => {
        fetch('/api/admin/reject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message)
                setStudents(students.filter(student => student.id !== id))
            })
            .catch(err => toast.error(`Error in rejecting registration: ${err.message}`))
    }

    return (
        <div className="p-8">
            <div className='flex'>
                <h1 className="text-2xl font-bold mb-6 inline-block">Pending Registration Requests</h1>
                <span className='text-2xl mx-3'>({filteredStudents.length})</span>
            </div>

            <div className="mb-6 flex gap-4">
                <input
                    type="text"
                    placeholder="Search by student name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-3 border border-gray-300 rounded-md w-1/3"
                />
                <select
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    className="p-3 border border-gray-300 rounded-md"
                >
                    <option value="All">All Branches</option>
                    {
                        branchOptions.map(branch => (
                            <option key={branch.name} value={branch.name}>{branch.name}</option>
                        ))
                    }
                </select>
            </div>

            {
                filteredStudents.length === 0 ?
                    <h2 className="text-red-500 mt-2 text-lg font-bold">No student found !</h2>
                    :
                    filteredStudents.map(student => (
                        <div key={student.id}
                             className="grid grid-cols-10 rounded-lg overflow-hidden shadow-lg mb-6 transition-all duration-500 ease-in-out">
                            <div
                                className="bg-blue-500 col-span-2 p-6 flex flex-col items-center justify-center text-white">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4"
                                />
                                <h2 className="text-lg font-semibold">John Doe</h2>
                                <p className="text-sm">Student</p>
                            </div>
                            <div className="bg-gray-100 col-span-8 p-3">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Student Details</h3>
                                <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                                    {/* Individual Detail Rows */}
                                    {
                                        [
                                            {label: 'Name', value: student.name},
                                            {label: 'Branch', value: student.branch},
                                            {label: 'Semester', value: student.semester},
                                            {label: 'Father Name', value: student.fatherName},
                                            {label: 'DOB', value: student.dob},
                                            {label: 'Email', value: student.email},
                                            {label: 'Contact No', value: student.contactNo},
                                            {label: 'Parent Contact No', value: student.parentContactNo},
                                            {label: 'Address', value: student.address},
                                        ]
                                            .map(detail => (
                                                <div key={student.id + detail.label}
                                                     className="bg-gray-50 p-3 rounded-md shadow-sm">
                                                    <span className="text-sm text-gray-500 mr-2">{detail.label}:</span>
                                                    <span
                                                        className="text-base font-medium text-gray-800">{detail.value}</span>
                                                </div>
                                            ))
                                    }
                                </div>
                                <div className='flex justify-center gap-6 px-4 mt-4'>
                                    <button
                                        onClick={() => {
                                            handleAcceptClick(student.id)
                                        }}
                                        className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md shadow-md transition-all">
                                        Accept
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleRejectClick(student.id)
                                        }}
                                        className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition-all">
                                        Reject
                                    </button>

                                </div>
                            </div>
                        </div>

                    ))
            }
        </div>
    );
};

export default PendingRegistrationRequest;
;