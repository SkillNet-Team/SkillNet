const express = require("express");
const router = express.Router();
const {getUser, postUser, patchUser, deleteUser} = require("../controllers/user-controllers");

router.get("/", getUser);
router.post("/", postUser);
router.patch("/", patchUser);
router.delete("/", deleteUser);

module.exports = router;