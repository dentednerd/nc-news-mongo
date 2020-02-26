const express = require('express');
const router = express.Router();
const { getAllTopics } = require('../controllers/topics');
const {
  getAllArticles,
  getArticleById,
  getArticlesByTopic
} = require('../controllers/articles');
const {
  getCommentsByArticle,
  postNewComment,
  voteArticle,
  voteComment,
  deleteComment,
  getUser
} = require('../controllers/comments');

router.get('/', (req, res) => res.send("Welcome to dentednerd's Northcoders News API! Try /topics, /users or /articles."));
router.get('/topics', getAllTopics);
router.get('/topics/:topic_id/articles', getArticlesByTopic);
router.get('/articles', getAllArticles);
router.get('/articles/:article_id', getArticleById);
router.get('/articles/:article_id/comments', getCommentsByArticle);
router.post('/articles/:article_id/comments', postNewComment);
router.put('/articles/:article_id', voteArticle);
router.put('/comments/:comment_id', voteComment);
router.delete('/comments/:comment_id', deleteComment);
router.get('/users/:username', getUser);

module.exports = router;
