import {Material} from "../../components/index.js";

function FacultyUploadMaterial() {
    return (
        <>
            <Material/>
            <div
                className="my-8 shadow-lg border-2 rounded-xl bg-gradient-to-r from-blue-50 via-white to-blue-50 w-[60%] mx-auto p-6">
                {/* Header */}
                <p className="text-center text-2xl font-bold text-blue-700 mb-6">Upload a New Material</p>

                {/* Form */}
                <form className="w-[80%] mx-auto">
                    {/* Title */}
                    <div className="mb-6">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-semibold text-gray-800"
                        >
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                            placeholder="Enter a title for the material"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-semibold text-gray-800"
                        >
                            Description:
                        </label>
                        <textarea
                            id="message"
                            rows="5"
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                            placeholder="Provide details about the material"
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-semibold text-gray-800"
                            htmlFor="material_file"
                        >
                            Upload Material:
                        </label>
                        <input
                            id="material_file"
                            type="file"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg cursor-pointer p-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 px-6 py-3 w-full sm:w-auto"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default FacultyUploadMaterial