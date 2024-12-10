import { useState } from "react";
import RoleCard from "./RoleCard";
import LoginModal from "./LoginModal";
import { userActions } from "../store/user.js";
import { useDispatch } from "react-redux";

const RoleSelection = () => {
    const dispatch = useDispatch();
    const { setRoleAsStudent, setRoleAsFaculty, setRoleAsAdmin } = userActions;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role, setRole] = useState("");

    function handleCardClick(selectedRole) {
        setRole(selectedRole);
        setIsModalOpen(true);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Select Your Role</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Choose your role to proceed to the relevant dashboard.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                    <RoleCard
                        role="Student"
                        description="Access student dashboard, enrollments, and more."
                        onClick={() => {
                            dispatch(setRoleAsStudent());
                            handleCardClick("Student");
                        }}
                    />
                    <RoleCard
                        role="Faculty"
                        description="Manage courses, view student records, and more."
                        onClick={() => {
                            dispatch(setRoleAsFaculty());
                            handleCardClick("Faculty");
                        }}
                    />
                    <RoleCard
                        role="Admin"
                        description="Oversee the system, manage users, and configure settings."
                        onClick={() => {
                            dispatch(setRoleAsAdmin());
                            handleCardClick("Admin");
                        }}
                    />
                </div>
            </div>
            {isModalOpen && (
                <LoginModal
                    role={role}
                    onClose={() => {
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default RoleSelection;
