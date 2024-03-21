const express = require("express");
const router = express.Router();
const {getUser, loginUser, signupUser, patchUser, deleteUser} = require("../controllers/user-controllers");

router.get("/", getUser);
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.patch("/", patchUser);
router.delete("/", deleteUser);

module.exports = router;