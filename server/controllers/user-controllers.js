const User = require("../models/user-model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function getUser(req, res) {
    
}

async function loginUser(req, res) {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) return res.status(400).json({message: "User not found"});
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        res.status(200).json({username});
    } else {
        res.status(400).json({message: "Invalid credentials"});
    }
}

// OG Function
/* async function signupUser(req, res) {
    console.log(req);
    console.log(req.body);
    const {email, username, password} = req.body;
    const user = await User.create({email, username, password});
    res.status(200).json({email, username});
} */

async function signupUser(req, res) {
    try {
        const {email, username, password} = req.body;
        const user = await User.create({email, username, password});
        res.status(201).json({email, username});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error creating user"});
    }
}

function patchUser(req, res) {

}

function deleteUser(req, res) {

}

module.exports = {getUser, loginUser, signupUser, patchUser, deleteUser};