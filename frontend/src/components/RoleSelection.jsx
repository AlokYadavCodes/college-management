import { useState } from "react";
import { RoleCard, LoginModal } from "./index.js";

const RoleSelection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    function handleCardClick(role) {
        setSelectedRole(role);
        setIsModalOpen(true);
    }

    return (
        <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
                Choose your role to proceed to the relevant dashboard.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                <RoleCard
                    role="Student"
                    description="Access student dashboard, enrollments, and more."
                    onClick={() => {
                        handleCardClick("student");
                    }}
                />
                <RoleCard
                    role="Faculty"
                    description="Manage courses, view student records, and more."
                    onClick={() => {
                        handleCardClick("faculty");
                    }}
                />
                <RoleCard
                    role="Admin"
                    description="Oversee the system, manage users, and configure settings."
                    onClick={() => {
                        handleCardClick("admin");
                    }}
                />
            </div>
            {isModalOpen && (
                <LoginModal
                    role={selectedRole}
                    onClose={() => {
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default RoleSelection;
