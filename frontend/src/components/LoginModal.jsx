import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user.js";
import {useState} from "react";

function LoginModal({role, onClose }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setIsLoggedIn , setRole} = userActions;
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })

    function onChange(e){
        const [name, value] = [e.target.name, e.target.value]
        setLoginData((prevData)=> (
            {...prevData, [name]: value}
        ))
    }



    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            console.log(JSON.stringify(loginData))

            if (!res.ok) {
                 console.log('Login response not ok:', res.status, res.statusText)
            }
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log('Error in authController:', error)
        }











        dispatch(setIsLoggedIn(true));
        dispatch(setRole(role))







        if (role === "student") {
            navigate("/student");
        } else if (role === "faculty") {
            navigate("/faculty");
        } else if (role === "admin") {
            navigate("/admin");
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <form
                onSubmit={handleFormSubmit}
                className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Login as {role}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-2xl"
                    >
                        <IoClose />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            value={loginData.username}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            value={loginData.password}
                            onChange={onChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium text-sm uppercase shadow-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginModal;
