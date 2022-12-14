const Comment = require('../models/Comment')
const User = require('../models/User')

module.exports = {

    // Create Comment
    createComment: async (req, res) => {
        try {
            const commentUser = await User.findById(req.user.id)
            await Comment.create(
                {
                    text: req.body.text,
                    likes: 0,
                    post: req.params.id,
                    createdBy: commentUser.userName,
                    createdById: req.user.id
                },
            )
            console.log('Comment Added')
            res.redirect(`/postPage/${req.params.id}/#comments`)
        } catch (error) {
            console.log(error)
        }
    },

    //Delete Comment
    deleteComment: async (req, res) => {
            try {
                await Comment.deleteOne({
                    _id: req.params.commentid
                })
                res.redirect(`/postPage/${req.params.postid}/#comments`);
            } catch (error) {
                console.error(error)
            } 
        },

    // Edit Comment
    editComment: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.commentid)

            if (!comment) {
                return res.render('error/404')
            }
            comment.text = req.body.text;
            await comment.save();
            res.redirect(`/postPage/${req.params.postid}/#comments`);
        } catch (error) {
            console.log(error)
        }
    }
}