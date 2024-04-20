const express = require("express");
const router = express.Router();
const { getUsers, getUser, loginUser, signupUser, patchUser, deleteUser } = require("../controllers/user-controllers");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

module.exports = router;