import {getUserProfile} from "../models/userModel.js";

export const profile = async (req, res) => {
    const {userId} = req.body;
    const userProfile = await getUserProfile(userId)
    const profile = {...userProfile}
    res.json(profile)
}