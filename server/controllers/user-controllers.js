const User = require("../models/user-model");
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// GET /api/users/
async function getUsers(req, res) {
    const users = await User.find({}).sort({createdAt: -1});

    if(users.length == 0) res.status(404).json({ message: "There are no users!" });
    else res.status(200).json(users);
}

// GET /api/users/:id
async function getUser(req, res) {
    const {id} = req.params;

    const user = await User.findById(id);

    if(!user) res.status(404).json({ message: "No such user!" });
    else res.status(200).json(user);
}

// POST /api/users/login
async function loginUser(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: "User not found"});
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        res.status(200).json({email, firstName: user.firstName, lastName: user.lastName});
    } else {
        res.status(400).json({message: "Invalid credentials"});
    }
}

// POST /api/users/signup
async function signupUser(req, res) {
    try {
        const {email, firstName, lastName, password} = req.body;
        const user = await User.create({email, firstName, lastName, password});
        res.status(201).json({email, firstName, lastName});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
}

// PATCH /api/users/:id
function patchUser(req, res) {

}

// DELETE /api/users/:id
async function deleteUser(req, res) {
    const {id} = req.params;

    const user = await User.findOneAndDelete({_id: id});

    if(!user) res.status(404).json({message: "No such user!"});
    else res.status(200).json({message: "User successfully deleted!"});
}

module.exports = {getUsers, getUser, loginUser, signupUser, patchUser, deleteUser};