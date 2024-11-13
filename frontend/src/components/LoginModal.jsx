import React from "react";
import './LoginModal.css'

function LoginModal({onClose}) {

    return (
        <>
            <div className='overlay'>
                <form className='login-container'>
                    <button
                        onClick={onClose}
                    >Close
                    </button>
                    <br/>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" placeholder="Username"/>
                    <br/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" placeholder="Password"/>
                    <br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default LoginModal;