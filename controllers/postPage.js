const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')

module.exports = {
    getPostPage: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            const creator = await User.findById(post.user)
            const comments = await Comment.find({post: req.params.id})
            res.render('post.ejs', {
                post: post, 
                user: req.user, 
                creator: creator,
                comments: comments,
            })
        } catch (error) {
            console.log(error)
        }
    },

  // Like Post
  likePost: async (req, res) => {
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
                res.redirect(`/postPage/${req.params.id}/#like`);
             } catch (err) {
                console.log(err);
            }
    }  else {
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
            res.redirect(`/postPage/${req.params.id}/#like`);
        
        } catch (err) {
            console.log(err);
        }
        }
    },
}
