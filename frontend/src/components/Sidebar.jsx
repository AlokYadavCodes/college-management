import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaTable, FaClipboardList, FaFileAlt, FaBullhorn, FaSignOutAlt, FaUpload, FaUsers, FaUniversity } from 'react-icons/fa';
import {useSelector} from "react-redux";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const {role}= useSelector((state) => state.user);

    const toggleSidebar = () => setIsOpen(!isOpen);

    // Define the tabs for each role
    let tabs = [];
    if (role === "student") {
        tabs = [
            { name: 'Profile', slug: 'profile', icon: <FaUser className="text-xl" /> },
            { name: 'Time Table', slug: 'time-table', icon: <FaTable className="text-xl" /> },
            { name: 'Result', slug: 'result', icon: <FaClipboardList className="text-xl" /> },
            { name: 'Material', slug: 'material', icon: <FaFileAlt className="text-xl" /> },
            { name: 'Notice', slug: 'notice', icon: <FaBullhorn className="text-xl" /> },
        ];
    } else if (role === "faculty") {
        tabs = [
            { name: 'Profile', slug: 'profile', icon: <FaUser className="text-xl" /> },
            { name: 'Upload Marks', slug: 'upload-marks', icon: <FaUpload className="text-xl" /> },
            { name: 'Upload Material', slug: 'upload-material', icon: <FaUpload className="text-xl" /> },
            { name: 'Time Table', slug: 'time-table', icon: <FaTable className="text-xl" /> },
            { name: 'Notice', slug: 'notice', icon: <FaBullhorn className="text-xl" /> },
        ];
    } else if (role === "admin") {
        tabs = [
            { name: 'Profile', slug: 'profile', icon: <FaUser className="text-xl" /> },
            { name: 'Students', slug: 'students', icon: <FaUsers className="text-xl" /> },
            { name: 'Faculties', slug: 'faculties', icon: <FaUniversity className="text-xl" /> },
            { name: 'Time Table', slug: 'time-table', icon: <FaTable className="text-xl" /> },
            { name: 'Upload Notice', slug: 'notice', icon: <FaBullhorn className="text-xl" /> },
        ];
    }

    return (
        <div className="flex h-screen sticky top-0">
            <div
                className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} h-full p-4 flex flex-col rounded-br-2xl shadow-md`}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        {isOpen && <span className="text-xl font-semibold"></span>}
                        <button
                            onClick={toggleSidebar}
                            className="text-white text-3xl focus:outline-none"
                        >
                            {isOpen ? "×" : "☰"}
                        </button>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className="space-y-6 mt-4">
                    <ul>
                        {tabs.map((tab) => (
                            <li key={tab.slug}>
                                <NavLink
                                    to={`/${role.toLowerCase()}/${tab.slug}`}
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-lg transition-all duration-300 ${
                                            isActive ? 'bg-white text-blue-500' : 'text-gray-200 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    {tab.icon}
                                    {isOpen && <span className="ml-4 text-lg">{tab.name}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sidebar footer with Logout */}
                <div className="mt-auto">
                    <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            `flex items-center w-full text-lg p-3 rounded-lg transition-all duration-300 ${
                                isActive ? 'bg-red-600 text-white' : 'text-red-200 hover:bg-red-500'
                            }`}
                    >
                        <FaSignOutAlt className="text-xl" />
                        {isOpen && <span className="ml-4 text-lg">Logout</span>}
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
