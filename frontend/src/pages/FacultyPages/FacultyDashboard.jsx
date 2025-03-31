import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Loading} from "../../components/index.js";

const FacultyDashboard = () => {

    const [loading, setLoading] = useState(true);
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalMaterials, setTotalMaterials] = useState(0);
    const {userId, name} = useSelector(state => state.user)

    // for total classes number
    useEffect(() => {
        setLoading(true);
        fetch(`/api/faculty/get-classes-no/${userId}`)
            .then(res => res.json())
            .then(data => {
                setTotalClasses(data)
            })
            .catch(err => console.error(`error in fetching total classes : ${err}`))
            .finally(() => setLoading(false));

    }, [userId]);

    // for total uploaded materials
    useEffect(() => {
        setLoading(true);
        fetch(`/api/faculty/get-materials-no/${userId}`)
            .then(res => res.json())
            .then(data => {
                setTotalMaterials(data)
            })
            .catch(err => console.error(`error in fetching materials : ${err}`))
            .finally(() => setLoading(false));
    }, [userId]);

    return (
        loading ? <Loading/> :
            <div className="p-8 bg-gray-100 min-h-screen">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Hello, <span
                        className='text-blue-600'>{name}</span>
                    </h1>
                    <p className="text-gray-600">Welcome back to your dashboard. Here's a quick overview.</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Total Classes */}
                    <Link
                        to='/faculty/classes'
                        className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-lg font-semibold text-gray-700">Total Classes</h2>
                        <p className="text-4xl font-bold text-indigo-600">{totalClasses}</p>
                        <p className="text-sm text-gray-500 mt-2">Scheduled this week</p>
                    </Link>

                    {/* Uploaded Materials */}
                    <Link
                        to='/faculty/upload-material'
                        className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-lg font-semibold text-gray-700">Uploaded Materials</h2>
                        <p className="text-4xl font-bold text-green-600">{totalMaterials}</p>
                        <p className="text-sm text-gray-500 mt-2">Available for students</p>
                    </Link>
                </div>

                {/* Actions Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Action: Upload Marks */}
                        <Link
                            to='/faculty/upload-marks'
                            className="p-6 bg-gradient-to-br from-green-100 to-teal-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">Upload Marks</h3>
                            <p className="text-sm text-gray-700 mt-2">Upload current semester marks of students.</p>
                            <button
                                className="mt-4 bg-green-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-green-700 transition-colors"
                            >
                                Upload Now
                            </button>
                        </Link>

                        {/* Action: Upload Materials */}
                        <Link
                            to='/faculty/upload-material'
                            className="p-6 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">Upload Materials</h3>
                            <p className="text-sm text-gray-700 mt-2">Add new learning resources for your students.</p>
                            <button
                                className="mt-4 bg-indigo-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
                            >
                                Upload Now
                            </button>
                        </Link>

                        {/* Action: Profile */}
                        <Link
                            to='/faculty/profile'
                            className="p-6 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">Profile</h3>
                            <p className="text-sm text-gray-700 mt-2">View your personal details here.</p>
                            <button
                                className="mt-4 bg-yellow-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-yellow-700 transition-colors"
                            >
                                View Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    );
};

export default FacultyDashboard;
