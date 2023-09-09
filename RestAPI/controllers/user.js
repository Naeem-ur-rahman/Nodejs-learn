const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    res.setHeader('X-Developer', "Naeem ur Rahman");
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
}

async function handleUpdateUserByID(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Updated" });
    return res.json({ status: "Success" });
}

async function handleDeleteUserByID(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "All fields required!" })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
    });
    res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser,
}