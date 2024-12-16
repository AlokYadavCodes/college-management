import {getUserProfile} from "../models/userModel.js";
import {getBranches, getSemesters, getSubjects, getStudents} from "../models/facultyModel.js";

export const profile = async (req, res) => {
    console.log(`inside profile`)
    const {userId} = req.body;
    const userProfile = await getUserProfile(userId)
    const profile = {...userProfile}
    res.json(profile)
}

export const branches = async (req, res) => {
    const {userId} = req.body;
    const branches = await getBranches(userId)
    res.json(branches)
}

export const semesters = async (req, res) => {
    const {userId, branchId} = req.body;
    const semesters = await getSemesters(userId, branchId)
    res.json(semesters)
}

export const subjects = async (req, res) => {
    const {userId, branchId, semesterId} = req.body;
    const subjects = await getSubjects(userId, branchId, semesterId)
    res.json(subjects)
}

export const students = async (req, res) => {
    const {userId, branchId, semesterId, subjectId} = req.body;
    const students = await getStudents(userId, branchId, semesterId, subjectId)
    res.json(students)
}
