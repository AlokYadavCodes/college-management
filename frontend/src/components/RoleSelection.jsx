import React, {useState} from 'react';
import './RoleSelection.css';
import RoleCard from './RoleCard'
import LoginModal from './LoginModal';

const RoleSelection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleCardClick(){
        setIsModalOpen(true)
    }

    return (
        <>
            <div className='role-selection'>
                <h2>Select Your Role</h2>
                <div className='role-cards'>
                    <RoleCard
                        role='Student'
                        description='Access student dashboard, enrollments, and more.'
                        onClick={handleCardClick}
                    />
                    <RoleCard
                        role='Faculty'
                        description='Manage courses, view student records, and more.'
                        onClick={handleCardClick}
                    />
                    <RoleCard
                        role='Admin'
                        description='Oversee the system, manage users, and configure settings.'
                        onClick={handleCardClick}
                    />
                </div>
            </div>
            {isModalOpen &&
                <LoginModal
                    onClose={() => {
                        setIsModalOpen(false)
                    }}
                />
            }

        </>
    );
};

export default RoleSelection;
