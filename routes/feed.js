const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, feedController.getFeed);
router.put('/like/:id', feedController.likePost)


module.exports = router;