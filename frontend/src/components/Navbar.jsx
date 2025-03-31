import {useState} from "react";
import {FaSignOutAlt} from 'react-icons/fa';
import {userActions} from "../store/user.js";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {setIsLoggedIn} = userActions
    const {name, role} = useSelector(state => state.user)
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        dispatch(setIsLoggedIn(false));
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md border-b border-gray-700">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                {/* Left Side: Logo and College Name */}
                <div className="flex items-center space-x-3">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="College Logo"
                        className="h-10 w-10"
                    />
                    <span className="text-xl font-semibold tracking-wide">IERT Prayagraj</span>
                </div>

                {/* Right Side: Profile */}
                <div className="relative z-10">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="flex items-center focus:outline-none transition-transform hover:scale-105"
                    >
                        <img
                            src="https://i.pinimg.com/736x/3f/9f/5b/3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg"
                            alt="User Profile"
                            className="w-10 h-10 rounded-full border border-gray-300 shadow-md"
                        />
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-xl border border-gray-700">
                            {/* Profile Option */}
                            <Link
                                to={`/${role}/profile`}
                                className="block px-4 py-2 text-gray-200 font-medium rounded-t-lg hover:bg-gray-700 transition-all duration-200 hover:text-blue-400"
                            >
                                <button className="w-full text-left">{name}</button>
                            </Link>

                            {/* Divider */}
                            <hr className="border-gray-700"/>

                            {/* Logout Option */}
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-b-lg hover:bg-red-700 focus:outline-none transition-all duration-200 hover:shadow-lg"
                            >
                                <FaSignOutAlt className="inline mr-2"/>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
