const express = require('express');

const { getNewsTopics, getArticlesByTopic, getAllArticles } = require('../controllers/user_controllers');

const router = express.Router();

// router.get('/users', getAllUsers); // send to client

// router.post('/users', addNewUser);

// router.get('/users/:id', getUserById);

// router.post('/users/remove', deleteUser);

// router.get('/api/topics', getNewsTopics);

router.get('/api/topics', getNewsTopics);

router.get('/api/topics/:topic_id/articles', getArticlesByTopic);

router.get('/api/articles', getAllArticles);

module.exports = router;