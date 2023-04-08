const express = require("express");
const router = express.Router();

const protect = require("../middlewares/Auth");
const { getDetails, updateDetails, updateInterests, updatePassword } = require("../controllers/Profile");

// Protect all routes after this middleware
router.use(protect);

// Routes
router.get('/', getDetails);
router.patch('/', updateDetails);
router.patch('/interests', updateInterests);
router.patch('/password', updatePassword);

module.exports = router;
