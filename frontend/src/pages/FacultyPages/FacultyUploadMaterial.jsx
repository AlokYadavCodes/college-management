import {Loading, Material} from "../../components/index.js";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

function FacultyUploadMaterial() {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [materials, setMaterials] = useState([])

    const [branchOptions, setBranchOptions] = useState([]);
    const [branch, setBranch] = useState();

    const [semesterOptions, setSemesterOptions] = useState([]);
    const [semester, setSemester] = useState();

    const {userId} = useSelector(state => state.user)

    // for branch options
    useEffect(() => {
        fetch('/api/faculty/branches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
            })
        })
            .then(res => res.json())
            .then((data) => {
                setBranchOptions(data)
            })
            .catch(err => console.log(`Error in fetching branches: ${err.message}`))
    }, [userId])


    // for semester options
    useEffect(() => {
        if (!branch) return;
        fetch('/api/faculty/semesters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                branchId: branch.id,
                userId: userId,
            })
        })
            .then(res => res.json())
            .then((data) => setSemesterOptions(data))
            .catch(err => console.log(`Error in fetching semesters: ${err.message}`))
    }, [branch, userId])

    // for getting materials
    useEffect(() => {
        setLoading(true)
        fetch(`/api/faculty/get-materials/${userId}`)
            .then(res => res.json())
            .then(data => {
                setMaterials(data)
            })
            .catch((error) => console.log(`error in fetching faculty material: ${error}`))
            .finally(() => setLoading(false))
    }, []);

    const handleBranchChange = (e) => {
        const name = e.target.value;
        const branch = branchOptions.find((branch) => branch.name === name)
        setSemester('')
        setBranch(branch)
    }

    const handleSemesterChange = (e) => {
        const number = Number(e.target.value);
        const semester = semesterOptions.find((semester) => semester.number === number)
        setSemester(semester)
    }
    const handleMaterialSubmit = (e) => {
        fetch('/api/faculty/add-material', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                branchId: branch.id,
                semesterId: semester.id,
                title,
                description,
            })
        })
            .then(res => res.json())
            .then(data => {
                data.success ? toast.success(data.message) : toast.error(data.message);
                setTitle('')
                setDescription('')
                setBranch('')
                setSemester('')
            })
        e.preventDefault();
        console.log(branch)
        console.log(semester)
    }

    return (
        loading ? (
            <Loading/>
        ) : (
            <>
                <Material materials={materials}/>
                <div className="my-8 shadow-lg border rounded-xl bg-white w-[90%] lg:w-[70%] mx-auto p-8">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Upload New Material</h2>
                        <p className="text-gray-500">Share resources with students !</p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleMaterialSubmit}
                        className="mt-8 space-y-6"
                    >
                        {/* Title */}
                        <div className="space-y-2">
                            <label
                                htmlFor="title"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Material Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter material title"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Description
                            </label>
                            <textarea
                                id="message"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Provide a brief description"
                            ></textarea>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <label
                                htmlFor="material_file"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Upload File
                            </label>
                            <input
                                id="material_file"
                                type="file"
                                className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Branch & Semester Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="branch"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Branch
                                </label>
                                <select
                                    id="branch"
                                    value={branch?.name || ''}
                                    onChange={handleBranchChange}
                                    className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">-- Select Branch --</option>
                                    {branchOptions.map((branch) => (
                                        <option key={branch.id} value={branch.name}>
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="semester"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Semester
                                </label>
                                <select
                                    id="semester"
                                    value={semester?.number || ''}
                                    onChange={handleSemesterChange}
                                    className="block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">-- Select Semester --</option>
                                    {semesterOptions.map((semester) => (
                                        <option key={semester.id} value={semester.number}>
                                            {semester.number}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                            >
                                Submit Material
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    );

}

export default FacultyUploadMaterial