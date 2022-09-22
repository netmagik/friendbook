const Post = require("../models/Post");
const User = require('../models/User')

module.exports = {

// Get Feed
getFeed: async (req, res) => {
    try {
      const post = await Post.find()
        .populate('user')
        .sort({ createdAt: "desc" })
        .lean();
      res.render("feed.ejs", { 
        posts: post, 
        postUser: post.user,
        user: req.user, 
      });
    } catch (err) {
      console.log(err);
    }
  },

//   Get Individual User Feed
getUserFeed: async (req, res) => {
    try {
        const post = await Post.find({
            user: req.params.user
        })
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean()
        const creator = await User.findById(req.params.user)
        res.render('byuser.ejs', {
            posts: post, 
            creator: creator,
            user: req.user
        })
        console.log(`User is ${creator.userName}`)
    } catch (error) {
        console.error(error)
    }
}, 

// Like Post
likePost: async(req, res) => {
    const post = await Post.findById(req.params.id)
    if(post.likes.includes(req.user.id)){
        try {
            await Post.findOneAndUpdate(
                { _id: req.params.id},
                {
                    $pull: { likes: req.user.id },
                },
                {
                    new: true,
                }
            )
            console.log("Likes -1");
            res.redirect(`/feed`);
            
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            await Post.findOneAndUpdate(
                { _id: req.params.id},
                {
                    $push: { likes: req.user.id },
                },
                {
                    new: true,
                }
            )
            console.log("Likes +1");
            res.redirect(`/feed`);
        
        } catch (err) {
            console.log(err);
        }
    }
    },
}