import express from 'express';
import {
    profile,
    totalStudentsNo,
    totalFacultiesNo,
    totalPendingRequestsNo,
    pendingRegistration,
    allBranches,
    accept,
    reject,
    isRegAllowed,
    setRegAllowed
} from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.post('/profile', profile)
adminRoutes.get('/total-students-no', totalStudentsNo)
adminRoutes.get('/total-faculties-no', totalFacultiesNo)
adminRoutes.get('/total-pending-requests-no', totalPendingRequestsNo)
adminRoutes.get('/pending-registration', pendingRegistration)
adminRoutes.get('/all-branches', allBranches)
adminRoutes.post('/accept', accept)
adminRoutes.post('/reject', reject)
adminRoutes.get('/is-reg-allowed', isRegAllowed)
adminRoutes.post('/set-reg-allowed', setRegAllowed)

export default adminRoutes;