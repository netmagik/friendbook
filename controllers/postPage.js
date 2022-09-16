const Post = require('../models/Post')
const User = require('../models/User')

module.exports = {
    getPostPage: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            const creator = await User.findById(post.user)
            res.render('post.ejs', {post: post, user: req.user, creator: creator})
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
                res.redirect(`/postPage/${req.params.id}`);
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
            res.redirect(`/postPage/${req.params.id}`);
        
        } catch (err) {
            console.log(err);
        }
        }
    },

    // Add Comment
    comment: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $push: {comments: req.user.userName + ': ' + req.body.commentBody},
                },
                {new: true}
            )
            console.log('Comment Added')
            res.redirect(`/postPage/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
    },
    
}