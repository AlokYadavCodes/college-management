import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./components/index.js";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import {
    Login,
    FacultyProfile,
    FacultyUploadMarks,
    FacultyUploadMaterial,
    FacultyNotice,
    FacultyTimeTable,
    StudentMaterial,
    StudentNotice,
    StudentProfile,
    StudentResult,
    StudentTimeTable,
    AdminStudents,
    AdminFaculties,
    AdminTimeTable,
    AdminNotice,
    AdminProfile,
    StudentRegistration,
    StudentDashboard,
    AdminDashboard,
    PendingRegistrationRequest, StudentSubjects, FacultyDashboard, FacultyClasses,
} from "./pages/index.js";
import {useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";

function App() {
    function PrivateRoute({children, allowedRoles}) {
        const {isLoggedIn, role} = useSelector((state) => state.user);
        if (!isLoggedIn) {
            return <Navigate to="/login" replace/>;
        } else if (allowedRoles && !allowedRoles.includes(role)) {
            return <Navigate to={`/${role}`} replace/>;
        } else
            return children;
    }

    return (
        <>
            <ToastContainer/>
            <Routes>
                <Route path='*' element={<Navigate to="/login" replace/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register'
                       element={<StudentRegistration/>}/>
                <Route path='/student' element={<PrivateRoute allowedRoles={["student"]}> <Layout/> </PrivateRoute>}>
                    <Route index element={<Navigate to="dashboard" replace/>}/>
                    <Route path='dashboard' element={<StudentDashboard/>}/>
                    <Route path='profile' element={<StudentProfile/>}/>
                    <Route path="time-table" element={<StudentTimeTable/>}/>
                    <Route path="result" element={<StudentResult/>}/>
                    <Route path="material" element={<StudentMaterial/>}/>
                    <Route path="notice" element={<StudentNotice/>}/>
                    <Route path="subjects" element={<StudentSubjects/>}/>
                </Route>

                <Route path='/faculty' element={<PrivateRoute allowedRoles={["faculty"]}> <Layout/> </PrivateRoute>}>
                    <Route index element={<Navigate to="dashboard" replace/>}/>
                    <Route path="dashboard" element={<FacultyDashboard/>}/>
                    <Route path="profile" element={<FacultyProfile/>}/>
                    <Route path="upload-marks" element={<FacultyUploadMarks/>}/>
                    <Route path="upload-material" element={<FacultyUploadMaterial/>}/>
                    <Route path="time-table" element={<FacultyTimeTable/>}/>
                    <Route path="notice" element={<FacultyNotice/>}/>
                    <Route path="classes" element={<FacultyClasses/>}/>
                </Route>

                <Route path='/admin' element={<PrivateRoute allowedRoles={["admin"]}> <Layout/> </PrivateRoute>}>
                    <Route index element={<Navigate to="dashboard" replace/>}/>
                    <Route path="dashboard" element={<AdminDashboard/>}/>
                    <Route path="profile" element={<AdminProfile/>}/>
                    <Route path="students" element={<AdminStudents/>}/>
                    <Route path="faculties" element={<AdminFaculties/>}/>
                    <Route path="time-table" element={<AdminTimeTable/>}/>
                    <Route path="notice" element={<AdminNotice/>}/>
                    <Route path="pending-requests" element={<PendingRegistrationRequest/>}/>
                </Route>

            </Routes>
        </>
    )
}

export default App;
