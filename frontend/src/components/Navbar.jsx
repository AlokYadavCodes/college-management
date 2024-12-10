import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleProfileClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        // Implement your logout functionality here
        console.log("Logout clicked");
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-gray-800 border-b border-gray-700 shadow-md">
            <div className="px-4 py-2 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    {/* Logo and Sidebar Toggle */}
                    <div className="flex items-center">

                        <div className="flex items-center ml-3">
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                alt="Logo"
                                className="h-8 mr-3"
                            />
                            <span className="text-xl font-semibold text-white whitespace-nowrap">
                IERT Prayagraj
              </span>
                        </div>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={handleProfileClick}
                            className="flex items-center text-sm bg-gray-700 rounded-full focus:ring-4 focus:ring-gray-600"
                            aria-expanded={dropdownOpen}
                        >
                            <img
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                alt="User Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </button>
                        {dropdownOpen && (
                            <div
                                className="absolute right-0 z-50 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <div className="px-4 py-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Neil Sims
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        neil.sims@flowbite.com
                                    </p>
                                </div>
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-300">

                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
