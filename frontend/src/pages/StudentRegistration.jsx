import React, {useEffect, useState} from 'react';
import {Loading} from "../components/index.js";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const StudentRegistration = () => {

    const [loading, setLoading] = useState(true);
    const [isRegistrationAllowed, setIsRegistrationAllowed] = useState(false);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [department, setDepartment] = useState();

    const [branchOptions, setBranchOptions] = useState([]);
    const [branch, setBranch] = useState();

    const formDataInitialState = {
        name: '',
        username: '',
        password: '',
        email: '',
        contact_no: '',
        dob: '',
        address: '',
        father_name: '',
        parent_contact_no: '',
        department_id: undefined,
        branch_id: '',
        semester_id: 1,
    }

    const [formData, setFormData] = useState(formDataInitialState);
    const [errors, setErrors] = useState(formDataInitialState);

    // is registration allowed
    useEffect(() => {
        setLoading(true);
        fetch('/api/admin/is-reg-allowed')
            .then(res => res.json())
            .then(data => setIsRegistrationAllowed(data))
            .catch(err => console.log(`Error in fetching is registration allowed: ${err.message}`))
            .finally(() => setLoading(false));
    }, [])


// for fetching departments
    useEffect(() => {
        fetch('/api/register/departments')
            .then(res => res.json())
            .then(data => {
                setDepartmentOptions(data)
            })
            .catch(err => console.log(`Error in fetching departments: ${err.message}`));
    }, []);

// for fetching branches
    useEffect(() => {
        if (!department) return;
        fetch(`/api/register/branches/${department.id}`)
            .then(res => res.json())
            .then(data => {
                setBranchOptions(data)
            })
            .catch(err => console.log(`Error in fetching branches: ${err.message}`));

    }, [department]);

    function handleDepartmentChange(e) {
        const department = departmentOptions.find(department => department.name === e.target.value)
        setDepartment(department)
        setFormData((prev) => ({...prev, department_id: department.id}))
    }

    function handleBranchChange(e) {
        const branch = branchOptions.find(branch => branch.name === e.target.value)
        setBranch(branch)
        setFormData((prev) => ({...prev, branch_id: branch.id}))
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        validateField(name, value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "username") {
            fetch(`api/user/check-username/?${name}=${value}`)
                .then(res => res.json())
                .then(data => {
                    if (data.exists) {
                        setErrors({...errors, username: 'Username already exists'})
                    } else {
                        setErrors({...errors, username: ''})
                    }
                })
        } else if (name === "email") {
            fetch(`api/user/check-email/?${name}=${value}`)
                .then(res => res.json())
                .then(data => {
                    if (data.exists) {
                        setErrors({...errors, email: 'Email already exists'})
                    } else {
                        setErrors({...errors, email: ''})
                    }
                })
        }
    };

    const validateField = (name, value) => {
        const field = fields[name];
        let error;
        if (field.pattern && !field.pattern.test(value)) {
            error = `Invalid ${field.label}`;
        }
        if (field.required && !value) {
            error = `${field.label} is required`;
        } else {
            error = '';
        }
        setErrors({...errors, [name]: error});
    };

    const validateForm = () => {
        const newErrors = {};

        for (const key in fields) {
            const value = formData[key];
            const field = fields[key];

            let error = "";
            if (field.required && !value) {
                newErrors[key] = `${field.label} is required`;
            } else if (field.pattern && !field.pattern.test(value)) {
                newErrors[key] = `Invalid ${field.label}`;
            }
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await fetch('api/register/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                })
                if (!res.ok) {
                    toast.error(`Register response not ok: ${res.status}`)
                }
                const data = await res.json()
                toast.success(data.message)
            } catch (error) {
                toast.error(`Error in registering user: ${error}`)
            }
            setFormData(formDataInitialState);
            setErrors(formDataInitialState);
            setBranch(undefined);
            setDepartment(undefined);
        }
    };

    const fields = {
        name: {label: "Name", type: "text", required: true},
        username: {label: "Username", type: "text", required: true},
        password: {label: "Password", type: "password", required: true},
        email: {label: "Email", type: "email", required: true, pattern: /\S+@\S+\.\S+/},
        contact_no: {label: "Phone Number", type: "text", required: true, pattern: /^\d{10}$/},
        dob: {label: "Date of Birth", type: "date", required: true},
        address: {label: "Address", type: "textarea", required: true},
        father_name: {label: "Father's Name", type: "text", required: true},
        parent_contact_no: {label: "Parent's Contact", type: "text", required: true, pattern: /^\d{10}$/},
    };

    return (
        loading
            ?
            <Loading/>
            :
            !isRegistrationAllowed
                ?
                <div className='flex item-center justify-center mt-32'>
                    <div
                        className="flex items-center justify-center w-[calc(60%)] bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center p-6 rounded-lg shadow-lg">
                        <div className="max-w-md w-full">
                            <h1 className="text-2xl font-bold mb-4">
                                Registration is Currently Closed
                            </h1>
                            <p className="text-base mb-4">
                                Please check back later or contact the administration for more information.
                            </p>
                            <div className="mt-4">
                                <Link
                                    to='/login'
                                    className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-200 transition">
                                    Go to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                :
                <div
                    className="min-h-screen bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 flex items-center justify-center p-8">
                    <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl w-full">
                        <h2 className="bg-blue-700 rounded py-1 text-white text-3xl font-semibold text-center mb-8">
                            Student Registration
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                {Object.keys(fields).map((key) => {
                                    const field = fields[key];
                                    return (
                                        <div key={key}>
                                            <label htmlFor={key}
                                                   className="block text-sm font-medium text-gray-700 mb-2">
                                                {field.label}
                                            </label>
                                            {field.type === "textarea" ? (
                                                <textarea
                                                    id={key}
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleChange}
                                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    id={key}
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleChange}
                                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            )}
                                            {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                                        </div>
                                    );
                                })}

                                <div>
                                    <label
                                        htmlFor="department"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Department
                                    </label>
                                    <select
                                        required
                                        value={department?.name || ''}
                                        onChange={handleDepartmentChange}
                                        id="department"
                                        name="department"
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select department
                                        </option>
                                        {
                                            departmentOptions.map((department) => (
                                                <option key={department.id}
                                                        value={department.name}>{department.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="branch"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Branch
                                    </label>
                                    <select
                                        required
                                        value={branch?.name || ''}
                                        onChange={handleBranchChange}
                                        id="branch"
                                        name="branch"
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select branch
                                        </option>
                                        {
                                            branchOptions.map((branch) => (
                                                <option key={branch.id} value={branch.name}>{branch.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="flex justify-center mt-8">
                                <button
                                    type="submit"
                                    className="w-52 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none transition-all"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
    );
};

export default StudentRegistration