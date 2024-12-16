function RoleCard({role, description, onClick}) {
    return (
        <div
            className="role-card w-60 bg-white border-2 border-gray-200 shadow-lg shadow-blue-300 rounded-xl p-6 text-center transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
            onClick={onClick}
        >
            <h3 className="text-xl font-semibold text-gray-700 mb-3">{role}</h3>
            <p className="text-sm text-gray-500">{description}</p>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-600">
                Select
            </button>
        </div>
    );
}

export default RoleCard;
