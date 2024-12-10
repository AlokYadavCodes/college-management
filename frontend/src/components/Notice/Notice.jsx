function Notice() {
    return (
        <div
            className="border border-gray-200 rounded-lg shadow-lg p-6 m-4 bg-white hover:shadow-2xl transition-all duration-300">
            <div className="w-full">
                <p className="font-semibold text-gray-900 text-lg">Tomorrow will be holiday</p>
                <p className="text-sm text-gray-600 mt-2">
                    This file contains important previous year questions from the database management system. Make sure
                    to
                    completely solve this. This file contains important previous year questions.
                </p>
            </div>
            <div className="mt-4">
                <button
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                    View Attachments
                </button>
            </div>
        </div>

    )
}

export default Notice;