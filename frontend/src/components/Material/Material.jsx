import {useSelector} from "react-redux";

function Material({materials}) {

    const {role} = useSelector((state) => state.user)
    return (
        <>
            <div className="m-4">
                {materials.map(material => (
                    <div key={material.id}
                         className="mb-2 border border-gray-200 rounded-lg shadow-lg p-4 flex items-center justify-between bg-white hover:shadow-xl transition-all">
                        {/* Content Section */}
                        <div className="w-[calc(100%-150px)]">
                            <p className="font-semibold text-gray-900 text-lg">{material.title}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                {material.description}
                            </p>
                            {role?.toLowerCase() === 'student' &&
                                <div className="text-xs mt-4">
                                    <span className="text-gray-500">Uploaded by:</span>
                                    <span
                                        className="text-blue-700 font-semibold"> {material?.createdBy + ' Sir'} </span>
                                </div>
                            }
                        </div>

                        {/* Download Button */}
                        <div className="flex items-center justify-center w-[150px] ml-2">
                            <button
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105">
                                Download
                            </button>
                        </div>
                    </div>

                ))}
            </div>

        </>
    )
}

export default Material;