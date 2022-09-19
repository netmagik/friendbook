const Comment = require('../models/Comment')

module.exports = {

    // Create Comment
    createComment: async (req, res) => {
        try {
            await Comment.create(
                {
                    text: req.body.text,
                    post: req.params.id
                },
            )
            console.log('Comment Added')
            res.redirect(`/postPage/${req.params.id}/#comments`)
        } catch (error) {
            console.log(error)
        }
    },

    // Delete Comment
    // deleteComment: async (req, res) => {
    //     const post = Post.findById(req.params.id)
    //     // Find post by id
    //     if(post.comments.includes(req.user.userName)){
    //         try {
    //             await Post.findOneAndUpdate(
    //                 {_id: req.params.id},
    //                 {
    //                     $pull: { comments: req.user.userName},
    //                 },
    //                 {
    //                     new: true,
    //                 }
    //             )
    //             console.log("Deleted Comment");
    //             res.redirect(`/postPage/${req.params.id}`);

    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
                
    //     },
    
}