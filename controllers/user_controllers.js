const { Users, Comments, Topics } = require('../models/models');
// // const { map } = require('async');

exports.getNewsTopics = (req, res) => {
    Topics.find({})
        .then((topics) => {
            res.json({ topics: topics })
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};
