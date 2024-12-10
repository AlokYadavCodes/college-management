function Profile(){

    const student={}
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Left Column */}
                    <div className="bg-blue-500 text-white p-6 flex flex-col items-center justify-center">
                        <img
                            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                            src='https://i.pinimg.com/736x/5a/ab/f8/5aabf84d67477f77d3bb8f0fe4cfcd17.jpg'
                            // src={student.image}
                            alt={`${student.name}'s profile`}
                        />
                        <h2 className="mt-4 text-2xl font-semibold">Ramesh Yadav</h2>
                        {/*<h2 className="mt-4 text-2xl font-semibold">{student.name}</h2>*/}
                        <p className="text-sm mt-2">Enrollment No: {student.enrollment}</p>
                        <p className="mt-4 text-gray-200">
                            {student.course} - Semester {student.semester}
                        </p>
                        <button
                            className="mt-6 px-4 py-2 bg-white text-blue-500 font-semibold rounded-lg shadow hover:bg-gray-100">
                            Edit Profile
                        </button>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-2 p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Student Details
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Each detail */}
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">{student.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium text-gray-800">{student.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Date of Birth</p>
                                <p className="font-medium text-gray-800">{student.dob}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Address</p>
                                <p className="font-medium text-gray-800">{student.address}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Class</p>
                                <p className="font-medium text-gray-800">{student.className}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Section</p>
                                <p className="font-medium text-gray-800">{student.section}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Parent's Name</p>
                                <p className="font-medium text-gray-800">{student.parentName}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Parent's Contact</p>
                                <p className="font-medium text-gray-800">
                                    {student.parentContact}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Academic Performance
                            </h3>
                            <p className="text-gray-500">Result Status</p>
                            <p className="font-medium text-gray-800">{student.resultStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}

export default Profile;