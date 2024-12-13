import {checkPassword, isUser, verifyRole} from "../models/authModel.js";
import {getUserDetails} from "../models/userModel.js";

export const login = async (req, res) => {
    const {username, password, role} = req.body;
    if (!await isUser(username)) {
        return res.status(401).json({
            message: "Invalid username"
        });
    }
    if (!await checkPassword(username, password)) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }
    if (!await verifyRole(username, role)) {
        return res.status(401).json({
            message: `Not registered as ${role}`
        });
    }
    const userDetails = await getUserDetails(username);
    return res.status(200).json(userDetails);
}