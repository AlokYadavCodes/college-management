import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import {Provider, useSelector} from "react-redux";
import store from "./store/index.js";
import LoginModal from "./components/LoginModal.jsx";
import StudentProfile from "./pages/StudentPages/StudentProfile.jsx";
import StudentTimeTable from "./pages/StudentPages/StudentTimeTable.jsx";
import StudentResult from "./pages/StudentPages/StudentResult.jsx";
import StudentNotice from "./pages/StudentPages/StudentNotice.jsx";
import StudentMaterial from "./pages/StudentPages/StudentMaterial.jsx";
import FacultyUploadMarks from "./pages/FacultyPages/FacultyUploadMarks.jsx";
import FacultyUploadMaterial from "./pages/FacultyPages/FacultyUploadMaterial.jsx";
import FacultyNotice from "./pages/FacultyPages/FacultyNotice.jsx";
import FacultyTimeTable from "./pages/FacultyPages/FacultyTimeTable.jsx";
import AdminStudents from "./pages/AdminPages/AdminStudents.jsx";
import AdminFaculties from "./pages/AdminPages/AdminFaculties.jsx";
import AdminTimeTable from "./pages/AdminPages/AdminTimeTable.jsx";
import AdminNotice from "./pages/AdminPages/AdminNotice.jsx";
import FacultyProfile from "./pages/FacultyPages/FacultyProfile.jsx";
import AdminProfile from "./pages/AdminPages/AdminProfile.jsx";


const router=createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/login" element={<HomePage/>}/>
        <Route path="/" element={<App/>}>

            <Route path="student">
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="time-table" element={<StudentTimeTable />} />
                <Route path="result" element={<StudentResult />} />
                <Route path="material" element={<StudentMaterial />} />
                <Route path="notice" element={<StudentNotice />} />
            </Route>

            <Route path="faculty">
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<FacultyProfile />} />
                <Route path="upload-marks" element={<FacultyUploadMarks />} />
                <Route path="upload-material" element={<FacultyUploadMaterial />} />
                <Route path="time-table" element={<FacultyTimeTable />} />
                <Route path="notice" element={<FacultyNotice />} />
            </Route>


            <Route path="admin">
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="faculties" element={<AdminFaculties />} />
                <Route path="time-table" element={<AdminTimeTable />} />
                <Route path="notice" element={<AdminNotice />} />
            </Route>

        </Route>
        </>
    )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
  </StrictMode>
)
