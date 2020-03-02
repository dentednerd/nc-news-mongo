const express = require('express');
const router = express.Router();
const { getAllTopics } = require('../controllers/topics');
const {
  getAllArticles,
  getArticleById,
  getArticlesByTopic,
  getArticlesByUser
} = require('../controllers/articles');
const {
  getCommentsByArticle,
  getCommentsByUser,
  postNewComment,
  voteArticle,
  voteComment,
  deleteComment,
} = require('../controllers/comments');
const { getAllUsers, getUser } = require('../controllers/users');

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
router.get('/users', getAllUsers);
router.get('/users/:username', getUser);
router.get('/users/:username/articles', getArticlesByUser);
router.get('/users/:username/comments', getCommentsByUser);

module.exports = router;
