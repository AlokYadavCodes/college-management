import {usernameExists} from '../models/userModel.js'

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

export const registerUser = async (req, res) => {
    res.json({
        message: 'success'
    })
}
