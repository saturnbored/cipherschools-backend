const express = require("express");

const { register, login } = require("../controllers/User");

const router = express.Router();

router.post("/", register);
router.post("/login", login);

module.exports = router;
