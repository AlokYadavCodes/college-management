import {getDepartments, getBranches, submitRequest} from "../models/registerModel.js";

export const departments = async (req, res) => {
    const departments = await getDepartments()
    res.json(departments)
}

export const branches = async (req, res) => {
    const {departmentId} = req.params;
    const branches = await getBranches(departmentId)
    res.json(branches)
}

export const submit = async (req, res) => {
    const formData = req.body;
    const message = await submitRequest(formData);
    res.json(message)
}