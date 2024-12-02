import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Student from "./pages/Student.jsx";
import Faculty from "./pages/Faculty.jsx";
import Admin from "./pages/Admin.jsx";

const router=createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            { path:'/', element: <HomePage/> },
            { path:'/student', element: <Student/> },
            { path:'/faculty', element: <Faculty/> },
            { path:'/admin', element: <Admin/> },
        ]
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
