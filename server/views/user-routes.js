const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const {getUsers, getUser, loginUser, signupUser, patchUser, deleteUser} = require("../controllers/user-controllers");
=======
const { getUsers, getUser, loginUser, signupUser, patchUser, deleteUser } = require("../controllers/user-controllers");
>>>>>>> e707bdb4d9c93350cf2014892f901a062b1100c2

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/signup", signupUser);
<<<<<<< HEAD
router.patch("/:", patchUser);
=======
router.patch("/:id", patchUser);
>>>>>>> e707bdb4d9c93350cf2014892f901a062b1100c2
router.delete("/:id", deleteUser);

module.exports = router;