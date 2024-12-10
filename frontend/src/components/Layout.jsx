import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer/Footer.jsx";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className='flex '>
                <Sidebar/>
                <div className='ml-64 w-[calc(100%-16rem)] mt-14'>
                    <div>
                        {children}
                        {/*<Footer/>*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;