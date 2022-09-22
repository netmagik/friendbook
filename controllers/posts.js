const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require('../models/User');

module.exports = {

  // Get Profile
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // Add User Profile PHoto under Profile/Post, if there isn't one already
  addProfilePhoto: async (req, res) => {
    const user = await User.findById(req.user.id)
    try {
      const update = await cloudinary.uploader.upload(req.file.path);
      user = await User.findOneAndUpdate({
        _id: req.user.id,
        image: update.secure_url,
        cloudinaryId: update.public_id,
      })
      console.log("Profile Photo added");
      res.redirect('/post');
    } catch (error) {
      console.log(error)
    }
  },

  // Create New Post
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/post");
    } catch (err) {
      console.log(err);
    }
  },
// Delete Post
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      res.redirect("/post");
    } catch (err) {
      res.redirect("/post");
    }
  },
};
