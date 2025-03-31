import {
    getSemestersArr,
    getResult,
    getStudentProfile,
    getStudentMaterials,
    getStudentSubjects
} from "../models/studentModel.js";
import {getUserProfile} from "../models/userModel.js";

export const semesters = async (req, res) => {
    const {userId} = req.body;

    const semestersArr = await getSemestersArr(userId)
    res.json({
        semesters: semestersArr
    })
}

export const result = async (req, res) => {
    const {userId, semester} = req.body;
    const result = await getResult(userId, semester)
    res.json(result)
}

export const profile = async (req, res) => {
    const {userId} = req.body;
    const userProfile = await getUserProfile(userId)
    const studentProfile = await getStudentProfile(userId)
    const profile = {...userProfile, ...studentProfile}
    console.log(profile)
    res.json(profile)
}

export const getMaterials = async (req, res) => {
    const {userId} = req.params;
    const response = await getStudentMaterials(userId)
    res.json(response)
}

export const getSubjects = async (req, res) => {
    const {userId} = req.params;
    const response = await getStudentSubjects(userId)
    res.json(response)
}