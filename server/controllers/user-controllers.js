const User = require("../models/user-model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// GET /api/users/
async function getUsers(req, res) {
    const users = await User.find({}).sort({createdAt: -1});

    if(users.length == 0) res.status(404).json({ message: "There are no users!" });
    else res.status(200).json(users);
}

// GET /api/users/:id
async function getUser(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
}

// POST /api/users/login
async function loginUser(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: "Incorrect email or password."});
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        res.status(200).json({
            email: user.email, 
            firstName: user.firstName, 
            lastName: user.lastName,
            occupation: user.occupation,
            location: user.location,
            phone: user.phone,
            skills: user.skills,
            interests: user.interests,
            galleryImages: user.galleryImages,
            profilePicture: user.profilePicture
        });
    } else {
        res.status(400).json({message: "Incorrect email or password."});
    }
}

// POST /api/users/signup
async function signupUser(req, res) {
    try {
        const {email, firstName, lastName, password, confirmPassword} = req.body;
        const user = await User.create({email, firstName, lastName, password});
        res.status(201).json({email, firstName, lastName});
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).send({message: "This email address already has an account."});
        }
        else {
            res.status(500).send(error);
        }
    }
}

// PATCH /api/users/:id
async function patchUser(req, res) {
    const {email} = req.params;
    console.log(email);
    
    try {
        const data = req.body;
        console.log(data);
        console.log(data.name);
        const user = await User.findOneAndUpdate({email}, 
            {
            firstName: data.name.split(" ")[0], 
            lastName: data.name.split(" ")[1],
            skills: data.skills,
            interests: data.interests,
            galleryImages: data.galleryImages,
            profilePicture: data.profilePicture
            });
        res.status(200).json({message: "User successfully updated."});
    }
    catch (error) {
        res.status(500).send(error);
    }
}

// DELETE /api/users/:id
async function deleteUser(req, res) {
    const {id} = req.params;

    const user = await User.findOneAndDelete({_id: id});

    if(!user) res.status(404).json({message: "No such user!"});
    else res.status(200).json({message: "User successfully deleted!"});
}

module.exports = {getUsers, getUser, loginUser, signupUser, patchUser, deleteUser};