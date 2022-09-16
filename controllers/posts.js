const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

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
      console.log(req.params.id);
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
