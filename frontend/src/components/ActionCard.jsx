import {FaUserAlt} from "react-icons/fa";
import './actionCard.css'


function ActionCard() {
    return (
        <div className='action-card'>
            <div className='card-icon'>
                <FaUserAlt size={50}/>
            </div>
            <div className='card-title'>
                Profile
            </div>
            <div className='card-body'>
                You may update your email Id or mobile no from my profile link.
            </div>
        </div>
    )
}