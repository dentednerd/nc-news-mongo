const { Users, Comments, Topics, Articles } = require('../models/models');

exports.getNewsTopics = (req, res) => {
    Topics.find({})
        .then((topics) => {
            return res.json({ topics });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.getArticlesByTopic = (req, res) => {
    let slug = req.params.topic_id;
    Articles.find({}, (err) => {
        if (err) return res.status(500).send('Its broken');
        else {
            Topics.findById(slug)
                .then(
                    Articles.find({ belongs_to: slug }, (err, articles) => {
                        if (err) { console.log(err); } else { res.json(articles); }
                    })
                );
        }
    });
};

exports.getAllArticles = (req, res) => {
    Articles.find({})
        .then((articles) => {
            return res.json({ articles });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};