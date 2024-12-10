import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user.js";

function LoginModal({ onClose }) {
    const { role } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { setIsLoggedInTrue } = userActions;

    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();
        // Simulate authentication logic
        dispatch(setIsLoggedInTrue());
        if (role === "Student") {
            navigate("/student");
        } else if (role === "Faculty") {
            navigate("/faculty");
        } else if (role === "Admin") {
            navigate("/admin");
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <form
                onSubmit={handleFormSubmit}
                className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6"
            >
                {/* Header */}
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

                {/* Body */}
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
