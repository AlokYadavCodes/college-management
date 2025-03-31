import {Profile, Loading} from "../../components/index.js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function StudentProfile() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: null,
        dob: null,
        fatherName: null,
        email: null,
        contactNo: null,
        parentContactNo: null,
        branchName: null,
        semesterNumber: null,
    })
    const {userId} = useSelector(state => state.user)
    useEffect(() => {
        setLoading(true)
        fetch('/api/student/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
            })
        })
            .then(res => res.json())
            .then(profile => {
                setProfile(profile)
            })
            .catch(err => console.log(`Error in fetching profile: ${err.message}`))
            .finally(() => setLoading(false))
    }, [userId])
    return loading ? <Loading/> : (
        <>
            <Profile profile={profile}/>


            <div className="mx-10 bg-white overflow-hidden shadow-lg rounded-lg border border-gray-300">
                <div className="px-6 py-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <h3 className="text-xl font-semibold">Other details:</h3>
                    <p className="mt-1 text-sm">Here are other details:</p>
                </div>
                <div className="border-t border-gray-200 px-6 py-5">
                    <dl className="divide-y divide-gray-200">
                        {[
                            {label: "Name", value: profile.name},
                            {label: "Branch", value: profile.branchName},
                            {label: "Semester", value: profile.semesterNumber},
                        ].map((item, idx) => (
                            <div
                                key={item.label}
                                className={`py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ${
                                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }`}
                            >
                                <dt className="text-sm font-medium text-gray-700 hover:text-blue-500">
                                    {item.label}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </>
    );
}

export default StudentProfile;