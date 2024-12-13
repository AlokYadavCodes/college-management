import {Loading, Profile} from "../../components/index.js";
import {useEffect, useState} from "react";

function AdminProfile() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: null,
        dob: null,
        fatherName: null,
        email: null,
        contactNo: null,
        parentContactNo: null,
    })
    useEffect(() => {
        setLoading(true)
        fetch('/api/admin/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 2
            })
        })
            .then(res => res.json())
            .then(profile => {
                setProfile(profile)
            })
            .catch(err => console.log(`Error in fetching profile: ${err.message}`))
            .finally(() => setLoading(false))
    }, [])
    return loading ? <Loading/> : (
        <>
            <Profile profile={profile}/>
        </>
    );
}

export default AdminProfile;