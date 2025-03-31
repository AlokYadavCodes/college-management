import React from "react";
import {FaBook, FaCalendarAlt, FaBell, FaUser} from "react-icons/fa";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const StudentDashboard = () => {
    const {name} = useSelector(state => state.user);
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">Welcome Back, <span
                        className='text-blue-600'>{name}</span></h2>
                    <p className="text-gray-600">Here are your latest updates and insights.</p>
                </div>

                {/* Insights Grid */}
                <Link
                    to='/student/subjects'
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Subjects */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaBook className="text-blue-600 text-4xl mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold">Total Subjects</h3>
                            <p className="text-gray-600">3 Subjects Enrolled</p>
                        </div>
                    </div>

                    {/* Time Table */}
                    <Link
                        to='/student/time-table'
                        className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaCalendarAlt className="text-green-600 text-4xl mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold">Time Table</h3>
                            <p className="text-gray-600"></p>
                        </div>
                    </Link>

                    {/* Notices */}
                    <Link
                        to='/student/notice'
                        className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaBell className="text-yellow-600 text-4xl mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold">Notices</h3>
                            <p className="text-gray-600"></p>
                        </div>
                    </Link>

                    {/* Profile */}
                    <Link
                        to='/student/profile'
                        className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaUser className="text-purple-600 text-4xl mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold">Profile</h3>
                            <p className="text-gray-600"></p>
                        </div>
                    </Link>
                </Link>
            </main>
        </div>
    );
};

export default StudentDashboard;
