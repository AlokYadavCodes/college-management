import {useState} from "react";
import Tabs from "../components/Tabs.jsx";
import AdminProfile from "../components/Admin/AdminProfile.jsx";
import StudentTab from "../components/Admin/StudentTab.jsx";
import FacultyTab from "../components/Admin/FacultyTab.jsx";
import TimeTable from "../components/TimeTable.jsx";

function Admin() {
    const tabs=['Profile','Student', 'Faculty', 'Time Table']
    const [currentTab, setCurrentTab] = useState('Profile');
    return (
        <>
            <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab}/>

            {currentTab==='Profile' && <AdminProfile/>}
            {currentTab==='Student' && <StudentTab/>}
            {currentTab==='Faculty' && <FacultyTab/>}
            {currentTab==='Time Table' && <TimeTable/>}
        </>
    )
}

export default Admin;