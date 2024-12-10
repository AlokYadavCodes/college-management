import './App.css'
import Footer from './components/Footer/Footer.jsx'
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {useSelector} from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import {Navigate, Outlet} from "react-router-dom";
import Layout from "./components/Layout.jsx";

function App() {
    const {isLoggedIn}=  useSelector((state) => state.user);
    if(!isLoggedIn){
        return (
            <Navigate to="/login"/>
        )
    } else {
        return (
            <Layout>
                <Outlet/>
            </Layout>
        )
    }
}

export default App
