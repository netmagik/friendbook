const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes 
router.get("/", ensureAuth, postsController.getProfile);
router.post("/createPost", upload.single("file"), postsController.createPost);
router.delete("/deletePost/:id", postsController.deletePost);
router.patch('/addProfilePhoto/:userid', upload.single("img"), postsController.addProfilePhoto);

module.exports = router;
