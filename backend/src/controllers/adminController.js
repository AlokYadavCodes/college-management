import {getUserProfile} from "../models/userModel.js";
import {
    getTotalStudentsNo,
    getTotalFacultiesNo,
    getTotalPendingRequestsNo,
    getPendingRegistrationStudents,
    getAllBranches,
    acceptRegistration, rejectRegistration,
    isRegistrationAllowed,
    setRegistrationAllowed
} from "../models/adminModel.js";

export const profile = async (req, res) => {
    const {userId} = req.body;
    const userProfile = await getUserProfile(userId)
    const profile = {...userProfile}
    res.json(profile)
}

export const totalStudentsNo = async (req, res) => {
    const totalStudents = await getTotalStudentsNo()
    res.json(totalStudents)
}

export const totalFacultiesNo = async (req, res) => {
    const totalFaculties = await getTotalFacultiesNo()
    res.json(totalFaculties)
}

export const totalPendingRequestsNo = async (req, res) => {
    const totalPendingRequests = await getTotalPendingRequestsNo()
    res.json(totalPendingRequests)
}

export const pendingRegistration = async (req, res) => {
    const students = await getPendingRegistrationStudents()
    res.json(students)
}

export const allBranches = async (req, res) => {
    const allBranches = await getAllBranches()
    res.json(allBranches)
}

export const accept = async (req, res) => {
    const {id} = req.body;
    const message = await acceptRegistration(id)
    res.json(message)
}

export const reject = async (req, res) => {
    const {id} = req.body;
    const message = await rejectRegistration(id)
    res.json(message)
}

export const isRegAllowed = async (req, res) => {
    const isAllowed = await isRegistrationAllowed()
    res.json(!!isAllowed)
}

export const setRegAllowed = async (req, res) => {
    const {isAllowed} = req.body;
    const message = await setRegistrationAllowed(isAllowed)
    res.json(message)
}