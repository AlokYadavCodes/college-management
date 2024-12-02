import {useState} from "react";

function Tabs({tabs, currentTab, setCurrentTab}) {

    return (
        <>
            <div></div>
            <div className='flex justify-center gap-4'>
                {tabs.map((tab) => (
                    <button onClick={()=>{
                        setCurrentTab(tab)
                    }} className={`${currentTab === tab ? 'bg-blue-700' : 'bg-blue-500'} px-10 py-1 rounded-sm text-white mx-2`}>
                        {tab}
                    </button>
                ))}
            </div>
        </>
    )
}

export default Tabs;