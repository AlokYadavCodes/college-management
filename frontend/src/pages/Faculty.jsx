import MyProfile from "../components/MyProfile.jsx";
import TimeTable from "../components/TimeTable.jsx";
import Marks from "../components/Marks.jsx";
import Material from "../components/Material.jsx";
import Notice from "../components/Notice.jsx";
import {useState} from "react";
import Tabs from "../components/Tabs.jsx";
import FacultyProfile from "../components/Faculty/FacultyProfile.jsx";
import UploadMarks from "../components/Faculty/UploadMarks.jsx";
import UploadMaterial from "../components/Faculty/UploadMaterial.jsx";

function Faculty() {
    const [currentTab, setCurrentTab] = useState('Profile');
    const tabs=['Profile','Upload Marks','Upload Material','Notice'];

    return (
        <>
            <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab}/>

            {currentTab === 'Profile' && <FacultyProfile/>}
            {currentTab === 'Upload Marks' && <UploadMarks/>}
            {currentTab === 'Upload Material' && <UploadMaterial/>}
            {currentTab === 'Notice' && <Notice/>}

        </>
    )
}

export default Faculty;