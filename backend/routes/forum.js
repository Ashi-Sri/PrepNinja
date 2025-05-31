const express = require('express');
const router = express.Router();
const ForumController = require('../controllers/forumController');

router.post('/questions', ForumController.askQuestion);
router.get('/questions', ForumController.getAllQuestions);
router.get('/questions/:id', ForumController.getSingleQuestion);
router.post('/questions/:id/comment', ForumController.addComment);

module.exports = router;
