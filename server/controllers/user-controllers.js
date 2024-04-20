const User = require("../models/user-model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// GET /api/users
async function getUsers(req, res) {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
}

// GET /api/users/:id
async function getUser(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No such user!" });

    const user = await User.findById(id);

    if (!user) res.status(404).json({ message: "No such user!" });
    else res.status(200).json(user);
}

// POST /api/users/login
async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Incorrect email or password." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        res.status(200).json({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            occupation: user.occupation,
            location: user.location,
            phone: user.phone,
            skills: user.skills,
            interests: user.interests,
            galleryImages: user.galleryImages,
            profilePicture: user.profilePicture,
            requests: user.requests
        });
    } else {
        res.status(400).json({ message: "Incorrect email or password." });
    }
}

// POST /api/users/signup
async function signupUser(req, res) {
    try {
        const { email, firstName, lastName, password, confirmPassword } = req.body;
        const user = await User.create({ email, firstName, lastName, password });
        res.status(201).json({ email, firstName, lastName });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).send({ message: "This email address already has an account." });
        }
        else {
            res.status(500).send(error);
        }
    }
}

// PATCH /api/users/:id
async function patchUser(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        console.log(updates);
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No such user!" });

        const ops = Object.keys(updates).map((key) => {
            if (Array.isArray(updates[key])) {
                return { $push: { [key]: { $each: updates[key] } } };
            } else {
                return { $set: { [key]: updates[key] } };
            }
        });

        console.log(ops);

        // const user = await User.findByIdAndUpdate({ _id: id }, { ...req.body });
        // if (!user) res.status(404).json({ error: "No such user!" });
        // else 
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was an error updating the user!" });
    }
}

// DELETE /api/users/:id
async function deleteUser(req, res) {
    const { id } = req.params;

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) res.status(404).json({ message: "No such user!" });
    else res.status(200).json({ message: "User successfully deleted!" });
}

module.exports = { getUsers, getUser, loginUser, signupUser, patchUser, deleteUser };