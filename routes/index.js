const express = require('express');

const { getNewsTopics, getArticlesByTopic, getAllArticles, getCommentsByArticle } = require('../controllers/user_controllers');

const router = express.Router();

router.get('/api/topics', getNewsTopics);
router.route('/api/topics/:topic_id/articles', getArticlesByTopic);

router.get('/api/articles', getAllArticles);
router.get('/api/articles/:article_id/comments', getCommentsByArticle);

module.exports = router;

