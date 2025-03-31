import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function StudentSubjects() {

    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const {userId} = useSelector(state => state.user);


    useEffect(() => {
        setLoading(true);
        fetch(`/api/student/get-subjects/${userId}`)
            .then(res => res.json())
            .then(data => {
                setSubjects(data);
            })
            .catch(err => console.log(`error in fetching student subjects: ${err}`))
            .finally(() => setLoading(false));
    }, [userId]);

    return (
        <div className="p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">
                    Your <span className="text-blue-500">Enrolled Subjects</span>
                </h1>
                <p className="text-gray-600 text-lg mt-2">
                    Here are the subjects you're currently enrolled in along with their faculty details.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                    <div
                        key={subject.id}
                        className="group relative p-6 border rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
                    >
                        <div
                            className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                            {`ID: ${subject.id}`}
                        </div>

                        <h2 className="text-xl font-bold text-blue-700 mb-2 group-hover:text-blue-900 transition-colors duration-300">
                            {subject.name}
                        </h2>
                        <p className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-300">
                            Faculty: <span className="font-semibold">{subject.faculty}</span>
                            <span
                                className="max-w-16 h-3 ml-2 bg-green-700 text-white text-xs px-2 rounded-full shadow-sm">
                                {`Faculty ID: ${subject.facultyId}`}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentSubjects;
