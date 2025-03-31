import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Loading} from "../../components/index.js";

function StudentResult() {
    const [loading, setLoading] = useState(true);
    const [semester, setSemester] = useState(1);
    const [options, setOptions] = useState([1]);
    const {userId} = useSelector(state => state.user)
    const [result, setResult] = useState({
        subjects: [{
            name: null,
            maxMarks: null,
            obtainedMarks: null,
            resultStatus: null
        }],
        grandTotal: null,
        totalObtainedMarks: null,
        percentage: null,
        resultStatus: null,
        totalSubjects: null,
    })

    useEffect(() => {
        setLoading(true)
        fetch('/api/student/semesters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
            })
        })
            .then(res => res.json())
            .then(data => {
                setOptions(data.semesters)
            })
            .catch(err => console.log(`Error in fetching semesters: ${err.message}`))
            .finally(() => setLoading(false))
    }, [userId]);

    useEffect(() => {
        setLoading(true)

        async function fetchResult() {
            console.log(`inside fetch result`)
            try {
                const res = await fetch('/api/student/result/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId,
                        semester,
                    })
                })
                if (!res.ok) {
                    console.log(`Fetch result response not ok: ${res.status}`)
                }
                const result = await res.json()
                console.log(result)
                setResult(result)

            } catch (error) {
                console.log('Error in fetching result:', error)
            } finally {
                setLoading(false)
            }

        }

        fetchResult()
    }, [semester, userId])

    return loading ? <Loading/> : (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Semester Selector */}
            <div className="text-center bg-white shadow-md rounded-lg p-4">
                <label htmlFor="semester" className="mr-2 text-lg font-medium text-gray-700">
                    Select Semester:
                </label>
                <select
                    id="semester"
                    onChange={(e) => {
                        setSemester(Number(e.target.value))
                    }}
                    value={semester}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))
                    }
                </select>
            </div>

            {/* Summary Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Semester</p>
                            <p className="text-gray-800">{semester}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Total Subjects</p>
                            <p className="text-gray-800">{result.totalSubjects}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Result Status</p>
                            <p className={`font-bold ${result.resultStatus?.toLowerCase()?.trim() === 'fail' ? 'text-red-600' : 'text-green-600'}`}>{result.resultStatus}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Grand Total</p>
                            <p className="text-gray-800">{result.grandTotal}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Total Obtained Marks</p>
                            <p className="text-gray-800">{result.totalObtainedMarks}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Percentage</p>
                            <p className="text-blue-600 font-bold">{result.percentage?.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Result Table */}
            <div className="mt-6">
                <div className="relative overflow-x-auto shadow-lg rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                        <tr>
                            <th scope="col" className="px-6 py-3">Subject</th>
                            <th scope="col" className="px-6 py-3">Maximum Marks</th>
                            <th scope="col" className="px-6 py-3">Obtained Marks</th>
                            <th scope="col" className="px-6 py-3">Result</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            result.subjects.map(subject => (
                                <tr key={subject.name}
                                    className={`${subject.resultStatus?.toLowerCase() === 'fail' ? 'bg-red-200 hover:bg-red-100' : 'bg-white border-b hover:bg-gray-50'}`}>
                                    <td className="px-6 py-4 text-gray-800">{subject.name}</td>
                                    <td className="px-6 py-4">{subject.maxMarks}</td>
                                    <td className="px-6 py-4">{subject.obtainedMarks}</td>
                                    <td className={`px-6 py-4 ${subject.resultStatus?.toLowerCase() === 'fail' ? 'text-red-600' : 'text-green-600'}`}>{subject.resultStatus}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentResult;
