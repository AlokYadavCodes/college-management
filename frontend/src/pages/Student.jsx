import MyProfile from "../components/MyProfile.jsx";
import TimeTable from "../components/TimeTable.jsx";
import Marks from "../components/Marks.jsx";
import Material from "../components/Material.jsx";
import Notice from "../components/Notice.jsx";
import Tabs from "../components/Tabs.jsx";
import {useState} from "react";


function Student() {
    const tabs=['Profile', 'Time Table', 'Marks','Material','Notice'];
    const [currentTab, setCurrentTab] = useState('Profile')


    return (
        <>
                <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab}/>

                {currentTab === 'Profile' && <MyProfile/>}
                {currentTab === 'Time Table' && <TimeTable/>}
                {currentTab === 'Marks' && <Marks/>}
                {currentTab === 'Material' && <Material/>}
                {currentTab === 'Notice' && <Notice/>}
        </>
    )
}

export default Student;