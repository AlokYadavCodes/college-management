import {Notice} from "../../components/index.js";

function FacultyNotice() {
    return (
        <>
            <Notice/>
            <div className="my-8 mb-6 shadow-xl border-2 rounded-lg bg-white w-[60%] mx-auto px-6 py-6">
                <p className="text-center text-2xl font-semibold text-gray-900 mb-6">Upload a New Notice</p>
                <form className="w-[90%] mx-auto">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full sm:w-[70%] bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm p-3 transition-all duration-300"
                            placeholder="Enter the title for the notice..."
                            required
                        />

                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 mt-6 mb-2">
                            Description
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 transition-all duration-300"
                            placeholder="Write more about the notice here..."
                        ></textarea>

                        <label htmlFor="notice_file" className="block text-sm font-medium text-gray-900 mt-6 mb-2">
                            Upload Notice
                        </label>
                        <input
                            type="file"
                            id="notice_file"
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg cursor-pointer py-3 px-4 text-sm text-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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

export default FacultyNotice;