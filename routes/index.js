const express = require('express');

const { getAllTopics } = require('../controllers/topics');
const { getAllArticles, getArticleById, getArticlesByTopic } = require('../controllers/articles');
const { getCommentsByArticle, postNewComment, voteArticle, voteComment, deleteComment, getUser } = require('../controllers/comments');

const router = express.Router();

router.get('/', (req, res) => res.send("Welcome to dentednerd's Northcoders News API!\nTry /topics, /users or /articles."));

// get all the topics
router.get('/topics', getAllTopics);

// get all articles for a topic
router.get('/topics/:topic_id/articles', getArticlesByTopic);

// get all articles
router.get('/articles', getAllArticles);

// get article by id
router.get('/articles/:article_id', getArticleById);

// get all comments for an article
router.get('/articles/:article_id/comments', getCommentsByArticle);

// post new comment to an article
router.post('/articles/:article_id/comments', postNewComment);

// increment/decrement votes on an article
router.put('/articles/:article_id', voteArticle);

// increment/decrement votes on a comment
router.put('/comments/:comment_id', voteComment);

// delete a comment
router.delete('/comments/:comment_id', deleteComment);

// // get JSON object with profile data for specific user
router.get('/users/:username', getUser);

module.exports = router;
