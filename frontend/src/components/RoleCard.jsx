import React from "react";
import './RoleCard.css'

function RoleCard({role, description, onClick}) {
    return (
        <>
            <div className='role-card' onClick={onClick}>
                <h3>{role}</h3>
                <p>{description}</p>
            </div>
        </>
    );
}

export default RoleCard;