const Post = require("../models/Post");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const post = await Post.find()
        .populate('user')
        .sort({ createdAt: "desc" })
        .lean();
      res.render("index.ejs", { 
        posts: post, 
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
