import React from "react";
import { FaBook, FaCalendarAlt, FaBell, FaUser } from "react-icons/fa";

const StudentDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            {/* Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Student Portal</h1>
                    <ul className="flex space-x-6">
                        <li className="text-gray-700 hover:text-blue-600 transition cursor-pointer">Dashboard</li>
                        <li className="text-gray-700 hover:text-blue-600 transition cursor-pointer">Profile</li>
                        <li className="text-gray-700 hover:text-blue-600 transition cursor-pointer">Timetable</li>
                        <li className="text-gray-700 hover:text-blue-600 transition cursor-pointer">Notices</li>
                        <li className="text-gray-700 hover:text-blue-600 transition cursor-pointer">Materials</li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">Welcome Back, [Student Name]</h2>
                    <p className="text-gray-600">Here are your latest updates and insights.</p>
                </div>

                {/* Insights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Subjects */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaBook className="text-blue-600 text-4xl mr-4" />
                        <div>
                            <h3 className="text-xl font-semibold">Total Subjects</h3>
                            <p className="text-gray-600">8 Subjects Enrolled</p>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaCalendarAlt className="text-green-600 text-4xl mr-4" />
                        <div>
                            <h3 className="text-xl font-semibold">Upcoming Events</h3>
                            <p className="text-gray-600">3 Events This Week</p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaBell className="text-yellow-600 text-4xl mr-4" />
                        <div>
                            <h3 className="text-xl font-semibold">Notifications</h3>
                            <p className="text-gray-600">5 New Notices</p>
                        </div>
                    </div>

                    {/* Profile Completion */}
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaUser className="text-purple-600 text-4xl mr-4" />
                        <div>
                            <h3 className="text-xl font-semibold">Profile Completion</h3>
                            <p className="text-gray-600">75% Completed</p>
                        </div>
                    </div>
                </div>

                {/* Recent Notices */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Notices</h3>
                    <ul className="bg-white shadow-md rounded-lg divide-y">
                        <li className="p-4 hover:bg-gray-50 transition">Notice 1: Midterm exam on Dec 20</li>
                        <li className="p-4 hover:bg-gray-50 transition">Notice 2: Submission deadline for Assignment 3</li>
                        <li className="p-4 hover:bg-gray-50 transition">Notice 3: Holiday on Dec 25</li>
                    </ul>
                </div>

                {/* Timetable */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Today's Classes</h3>
                    <table className="w-full bg-white shadow-md rounded-lg">
                        <thead>
                        <tr className="bg-gray-200 text-gray-600">
                            <th className="p-4 text-left">Time</th>
                            <th className="p-4 text-left">Subject</th>
                            <th className="p-4 text-left">Faculty</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="hover:bg-gray-50 transition">
                            <td className="p-4">10:00 AM</td>
                            <td className="p-4">Mathematics</td>
                            <td className="p-4">Dr. Sharma</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition">
                            <td className="p-4">12:00 PM</td>
                            <td className="p-4">Physics</td>
                            <td className="p-4">Dr. Verma</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
