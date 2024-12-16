import {usernameExists, emailExists} from '../models/userModel.js'

export const checkUsername = async (req, res) => {
    const {username} = req.query;
    if (await usernameExists(username)) {
        res.json({
            exists: true
        })
    } else {
        res.json({
            exists: false
        })
    }
}

export const checkEmail = async (req, res) => {
    const {email} = req.query;
    if (await emailExists(email)) {
        res.json({
            exists: true
        })
    } else {
        res.json({
            exists: false
        })
    }
}

export const registerUser = async (req, res) => {
    res.json({
        message: 'success'
    })
}
