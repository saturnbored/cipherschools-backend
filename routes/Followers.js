const express = require('express');
const router = express.Router();

const { getFollowers } = require('../controllers/Followers');
const protect = require('../middlewares/Auth');
const { addFollower } = require('../controllers/Followers');

router.use(protect);

router.patch('/', addFollower);
router.get('/' , getFollowers);

module.exports = router;
