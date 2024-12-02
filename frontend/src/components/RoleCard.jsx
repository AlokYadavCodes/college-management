import React from "react";

function RoleCard({role, description, onClick}) {
    return (
        <>
            <div className='role-card w-52 border border-slate-600 rounded-xl p-4 transition duration-200 hover:bg-slate-200 hover:-translate-y-1 hover:cursor-pointer' onClick={onClick}>
                <h3 className='mb-2.5 font-bold text-lg'>{role}</h3>
                <p className='text-sm text-gray-500'>{description}</p>
            </div>
        </>
    );
}

export default RoleCard;