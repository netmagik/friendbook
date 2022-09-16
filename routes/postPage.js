const express = require('express')
const router = express.Router()
const postPageController = require('../controllers/postPage')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/:id', ensureAuth, postPageController.getPostPage)
router.post('/comment/:id', postPageController.comment)
router.put("/likePost/:id", postPageController.likePost);

module.exports = router;