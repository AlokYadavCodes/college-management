import React, {useState} from 'react';
import RoleCard from './RoleCard'
import LoginModal from './LoginModal';

const RoleSelection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role,setRole] = useState('');

    function handleCardClick(role){
        setRole(role)
        setIsModalOpen(true)
    }

    return (
        <>
            <div className='text-center'>
                <h2 className='text-3xl'>Select Your Role</h2>
                <div className='flex gap-8 justify-center mt-8'>
                    <RoleCard
                        role='Student'
                        description='Access student dashboard, enrollments, and more.'
                        onClick={()=>{handleCardClick('Student')}}
                    />
                    <RoleCard
                        role='Faculty'
                        description='Manage courses, view student records, and more.'
                        onClick={()=>{handleCardClick('Faculty')}}
                    />
                    <RoleCard
                        role='Admin'
                        description='Oversee the system, manage users, and configure settings.'
                        onClick={()=>{handleCardClick('Admin')}}
                    />
                </div>
            </div>
            {isModalOpen &&
                <LoginModal
                    onClose={() => {
                        setIsModalOpen(false)
                    }}
                    role={role}
                />
            }

        </>
    );
};

export default RoleSelection;
