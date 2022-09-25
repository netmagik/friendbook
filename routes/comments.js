const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comments')

router.post('/createComment/:id', commentController.createComment)
router.delete('/deleteComment/:postid/:commentid', commentController.deleteComment)
router.patch('/editComment/:postid/:commentid', commentController.editComment)

module.exports = router;