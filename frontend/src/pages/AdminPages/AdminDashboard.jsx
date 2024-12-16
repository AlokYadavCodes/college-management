import {FaUsers, FaGraduationCap, FaClipboardList} from 'react-icons/fa';
import {AiFillPieChart, AiOutlineBarChart} from 'react-icons/ai';
import {useEffect, useState} from "react";
import {Loading} from "../../components/index.js";
import {Link} from "react-router-dom";

function Toggle({isChecked, onToggle}) {
    return (
        <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
                isChecked ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={onToggle}
            role="switch"
        >
            <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    isChecked ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
        </div>
    );
}

function AdminDashboard() {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isChecked, setIsChecked] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalFaculties, setTotalFaculties] = useState(0);
    const [totalPendingRequests, setTotalPendingRequests] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/admin/total-students-no')
            .then(res => res.json())
            .then(data => {
                setTotalStudents(data)
            })
            .catch(err => console.log(`Error in fetching total students: ${err.message}`))
            .finally(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/admin/total-faculties-no')
            .then(res => res.json())
            .then(data => {
                setTotalFaculties(data)
            })
            .catch(err => console.log(`Error in fetching total faculties: ${err.message}`))
            .finally(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/admin/total-pending-requests-no')
            .then(res => res.json())
            .then(data => {
                setTotalPendingRequests(data)
                console.log(`total pending requests: ${data}`)
            })
            .catch(err => console.log(`Error in fetching total pending requests: ${err.message}`))
            .finally(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        fetch('/api/admin/is-reg-allowed')
            .then(res => res.json())
            .then(data => {
                console.log(`is registration allowed: ${data}`)
                setIsChecked(data)
                setIsInitialLoad(false)
            })
            .catch(err => console.log(`Error in fetching is registration allowed: ${err.message}`))
    }, [])

    useEffect(() => {
        if (isInitialLoad) return;
        fetch('/api/admin/set-reg-allowed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isAllowed: isChecked
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(`Error in setting is registration allowed: ${err.message}`))
    }, [isChecked, isInitialLoad]);


    return (
        isLoading ? <Loading/> :
            <div className="min-h-screen bg-gray-100 p-4">
                <header className="flex justify-between item-center bg-white shadow py-4 px-6 rounded-lg mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className='flex justify-center items-center bg-gray-200 rounded-lg px-4 py-2'>
                        <p className='mr-3'>Allow Registration</p>
                        <Toggle isChecked={isChecked} onToggle={() => {
                            setIsChecked(!isChecked);
                        }}/>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <FaUsers className="text-blue-500 text-3xl mr-4"/>
                            <div>
                                <p className="text-gray-500">Total Students</p>
                                <p className="text-xl font-bold">{totalStudents}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <FaGraduationCap className="text-green-500 text-3xl mr-4"/>
                            <div>
                                <p className="text-gray-500">Total Faculties</p>
                                <p className="text-xl font-bold">{totalFaculties}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow relative">
                        {totalPendingRequests !== 0 &&
                            <div
                                className="absolute top-2 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                New!
                            </div>}

                        <Link
                            to="/admin/pending-requests"
                            className="flex items-center"
                        >
                            <FaClipboardList className="text-yellow-500 text-3xl mr-4"/>
                            <div>
                                <p className="text-gray-500">Pending Registration Request</p>
                                <p className="text-xl font-bold">{totalPendingRequests}</p>
                            </div>
                        </Link>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <h2 className="text-lg font-bold text-gray-700 mb-4">Student Distribution</h2>
                        <div className="flex justify-center items-center h-64">
                            {/* Placeholder for Pie Chart */}
                            <AiFillPieChart className="text-gray-300 text-9xl"/>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <h2 className="text-lg font-bold text-gray-700 mb-4">Performance Analysis</h2>
                        <div className="flex justify-center items-center h-64">
                            {/* Placeholder for Bar Chart */}
                            <AiOutlineBarChart className="text-gray-300 text-9xl"/>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Recent Activities</h2>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-3 flex justify-between items-center">
                            <p className="text-gray-600">New user registered: John Doe</p>
                            <span className="text-gray-400 text-sm">2 hours ago</span>
                        </li>
                        <li className="py-3 flex justify-between items-center">
                            <p className="text-gray-600">Student submitted report: Semester 4</p>
                            <span className="text-gray-400 text-sm">4 hours ago</span>
                        </li>
                        <li className="py-3 flex justify-between items-center">
                            <p className="text-gray-600">Error log: Database timeout</p>
                            <span className="text-gray-400 text-sm">6 hours ago</span>
                        </li>
                    </ul>
                </div>
            </div>
    );
}

export default AdminDashboard;
