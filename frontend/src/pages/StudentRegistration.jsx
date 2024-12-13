import React, {useState} from 'react';

const StudentRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        age: '',
        grade: '',
        phone: '',
        dob: '',
        address: '',
        parentName: '',
        parentPhone: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        username: '',
        email: '',
        age: '',
        grade: '',
        phone: '',
        dob: '',
        address: '',
        parentName: '',
        parentPhone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUsernameChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        try {
            const res = await fetch(`api/user/check-username/?${name}=${value}`)
            if(!res.ok){
                console.log(`Check username response not ok: ${res.status}`)
            }
            const data= await res.json();
            if(data.exists){
                setErrors({...errors, username: 'Username already exists'})
            }
            else{
                setErrors({...errors, username: ''})
            }
        } catch (error) {
            console.log(`Error in checking username: ${error}`)
        }

    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Valid email is required';
        if (!formData.age || formData.age <= 0)
            newErrors.age = 'Please enter a valid age';
        if (!formData.grade) newErrors.grade = 'Grade is required';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone))
            newErrors.phone = 'Phone number must be 10 digits';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.parentName) newErrors.parentName = 'Parent name is required';
        if (!formData.parentPhone || !/^\d{10}$/.test(formData.parentPhone))
            newErrors.parentPhone = 'Parent phone number must be 10 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await fetch('api/user/register', {
                    method: 'POST',
                    headers: {
                        ContentType: 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                if(!res.ok){
                    console.log(`Register response not ok: ${res.status}`)
                }
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.log(`Error in registering user: ${error}`)
            }

            setFormData({
                name: '',
                username: '',
                email: '',
                age: '',
                grade: '',
                phone: '',
                dob: '',
                address: '',
                parentName: '',
                parentPhone: '',
            });
            setErrors({});
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 flex items-center justify-center p-8">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl w-full">
                <h2 className="bg-blue-700 rounded py-1 text-white text-3xl font-semibold text-center  mb-8">Student Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleUsernameChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-300 mb-8"/>

                    {/* Academic Information Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">Academic
                            Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                            </div>

                            <div>
                                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                                    Grade
                                </label>
                                <input
                                    type="text"
                                    id="grade"
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
                            </div>

                            <div>
                                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Parent Name
                                </label>
                                <input
                                    type="text"
                                    id="parentName"
                                    name="parentName"
                                    value={formData.parentName}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
                            </div>

                            <div>
                                <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Parent Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="parentPhone"
                                    name="parentPhone"
                                    value={formData.parentPhone}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.parentPhone && <p className="text-red-500 text-xs mt-1">{errors.parentPhone}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
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

export default StudentRegistration;
