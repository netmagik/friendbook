const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const upload = require("../middleware/multer");
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", upload.single("img"), authController.postSignup);

module.exports = router;
