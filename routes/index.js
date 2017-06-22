const express = require('express');

const {getNewsTopics} = require('../controllers/user_controllers');

const router = express.Router();

// router.get('/users', getAllUsers); // send to client

// router.post('/users', addNewUser);

// router.get('/users/:id', getUserById);

// router.post('/users/remove', deleteUser);


// router.get('/api/topics', getNewsTopics);

router.get('/api/topics', getNewsTopics);


module.exports = router;