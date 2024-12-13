import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1 bg-gray-100">
                <Navbar/>
                <div className="container mx-auto">
                    <Outlet/>
                </div>
            </div>
        </div>

    )
}

export default Layout;