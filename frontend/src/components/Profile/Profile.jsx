function Profile({profile}) {

    return (
        <div className="bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Left Column */}
                    <div className="bg-blue-500 text-white p-6 flex flex-col items-center justify-center">
                        <img
                            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                            src='https://i.pinimg.com/736x/5a/ab/f8/5aabf84d67477f77d3bb8f0fe4cfcd17.jpg'
                            // src={profile.image}
                            alt={`${profile.name}'s profile`}
                        />
                        <h2 className="mt-4 text-2xl font-semibold">{profile.name}</h2>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-2 p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Personal Details
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Each detail */}
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">{profile.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium text-gray-800">{profile.contactNo}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Date of Birth</p>
                                <p className="font-medium text-gray-800">{profile.dob.split('T')[0]}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Address</p>
                                <p className="font-medium text-gray-800">{profile.address}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Parent's Name</p>
                                <p className="font-medium text-gray-800">{profile.fatherName}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Parent's Contact</p>
                                <p className="font-medium text-gray-800">
                                    {profile.parentContactNo}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;