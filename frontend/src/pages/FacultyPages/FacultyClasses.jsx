import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Loading} from "../../components/index.js";

const FacultyClasses = () => {

    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);

    const {userId} = useSelector(state => state.user)
    useEffect(() => {
        setLoading(true);
        fetch(`/api/faculty/get-classes/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setClasses(data);
            })
            .catch(error => console.log(`error in fetching faculty classes: ${error}`))
            .finally(() => setLoading(false));
    }, [userId])
    const data = [
        {
            department: "Computer Science",
            branches: [
                {
                    name: "CSE",
                    semesters: [
                        {number: 1, subjects: ["Mathematics", "Programming Basics"]},
                        {number: 3, subjects: ["Data Structures", "DBMS"]},
                        {number: 5, subjects: ["Operating Systems", "AI"]},
                    ],
                },
                {
                    name: "AI & ML",
                    semesters: [
                        {number: 2, subjects: ["Statistics", "Python Programming"]},
                        {number: 4, subjects: ["Machine Learning", "Deep Learning"]},
                        {number: 6, subjects: ["Natural Language Processing"]},
                    ],
                },
            ],
        },
        {
            department: "Electronics",
            branches: [
                {
                    name: "ECE",
                    semesters: [
                        {number: 1, subjects: ["Physics", "Circuit Analysis"]},
                        {number: 3, subjects: ["Signal Processing", "Microprocessors"]},
                    ],
                },
                {
                    name: "Robotics",
                    semesters: [
                        {number: 2, subjects: ["Introduction to Robotics", "Mechanics"]},
                        {number: 4, subjects: ["Embedded Systems", "Control Systems"]},
                    ],
                },
            ],
        },
    ];

    return (
        loading ? <Loading/> :
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
                    Faculty Classes
                </h1>
                <div className="space-y-6">
                    {classes.map((department, depIndex) => (
                        <div
                            key={depIndex}
                            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                        >
                            {/* Department */}
                            <div className="mb-4">
                                <h2 className="text-2xl font-semibold text-blue-600">
                                    {department.department}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Faculty teaching in this department.
                                </p>
                            </div>
                            {/* Branches */}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {department.branches.map((branch, branchIndex) => (
                                    <div
                                        key={branchIndex}
                                        className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-4 rounded-lg border border-gray-300 shadow-sm"
                                    >
                                        {/* Branch */}
                                        <h3 className="text-lg font-medium text-gray-700 mb-3">
                                            {branch.name}
                                        </h3>
                                        {/* Semesters */}
                                        <div className="space-y-4">
                                            {branch.semesters.map((semester, semIndex) => (
                                                <div key={semIndex}
                                                     className="bg-white p-3 rounded-lg shadow-md border">
                                                    <h4 className="text-sm font-medium text-gray-600">
                                                        Semester {semester.number}
                                                    </h4>
                                                    {/* Subjects */}
                                                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                                                        {semester.subjects.map((subject, subjIndex) => (
                                                            <li key={subjIndex}>{subject}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default FacultyClasses;
