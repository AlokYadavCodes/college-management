import React from "react";
import RoleSelection from "../components/RoleSelection.jsx";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-8 flex ">
            <div className="w-full bg-white rounded-xl shadow-xl p-8 space-y-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Welcome to the Dashboard</h1>
                <RoleSelection />
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        New here?{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:text-blue-700 transition-all duration-300"
                        >
                            Register as a Student
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
