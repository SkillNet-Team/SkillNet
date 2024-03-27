const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
    password: {type: String, required: true, unique: false}
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

module.exports = mongoose.model('User', userSchema);