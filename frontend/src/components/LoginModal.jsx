import React from "react";
import { IoClose } from "react-icons/io5";
import {useNavigate} from "react-router-dom";


function LoginModal({role, onClose}) {
    const navigate = useNavigate();
    function handleFormSubmit(e) {
        e.preventDefault();
        // auth
        if (role==='Student'){
            navigate('/student')
        } else if (role==='Faculty'){
            navigate('/faculty')
        } else if (role==='Admin'){
            navigate('/admin')
        }
    }

    return (
        <>
            <div className='bg-black/70 absolute top-0 left-0 w-screen h-screen flex justify-center items-center'>
                <form onSubmit={handleFormSubmit} className='login-container bg-white rounded-lg shadow-md p-4 w-72 sm:w-80 md:w-96'>
                    <div className='login-header flex justify-between text-lg'>
                        <div> Login as {role}</div>
                        <div>
                            <button className='text-lg' type='button' onClick={onClose}><IoClose />
                            </button>
                        </div>
                    </div>
                    <div className='login-body mt-4'>
                        <input className='mb-1.5 h-7 bg-gray-200/50 pl-2 rounded text-xs w-full hover:bg-gray-200 focus:border-2 focus:outline-none focus:border-blue-400' type="text" name="username"  placeholder="Username"/>
                        <br/>
                        <input className='h-7 bg-gray-200/50 pl-2 rounded text-xs w-full hover:bg-gray-200 focus:border-2 focus:outline-none focus:border-blue-400' type="password" name="password"  placeholder="Password"/>
                        <br/>
                        <button className='bg-blue-600 text-white text-md py-0.5 w-full mt-2 rounded uppercase' type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginModal;