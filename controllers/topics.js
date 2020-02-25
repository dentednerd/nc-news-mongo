const Topics = require('../models/topics');

exports.getAllTopics = (req, res) => {
    Topics.find({})
        .then((topics) => {
            res.append('Access-Control-Allow-Origin', '*').json({ topics });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};
