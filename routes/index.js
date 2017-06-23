const express = require('express');

const { getAllTopics } = require('../controllers/topics');
const { getAllArticles, getArticlesByTopic } = require('../controllers/articles');
const { getCommentsByArticle, postNewComment } = require('../controllers/comments');

const router = express.Router();

router.get('/', (req, res) => res.send('Everything is fine!'));

router.get('/topics', getAllTopics);
router.get('/topics/:topic_id/articles', getArticlesByTopic);

router.get('/articles', getAllArticles);
router.get('/articles/:article_id/comments', getCommentsByArticle);

router.post('/articles/:article_id/comments', postNewComment);

module.exports = router;