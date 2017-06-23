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

exports.getArticlesByTopic = (err, req, res, next) => {
    let { topic_id } = req.params;
    Articles.find({ belongs_to: topic_id })
        .then((articles) => {
            if (articles.length < 1) {
                return next({ status: 404, message: 'Topic not found' });
            }
            res.status(200).json({ articles });
        })
        .catch(next);
}

// , (err) => {
//     if (err) return res.status(500).send('Its broken');
//     else {
//         Topics.findById(slug)
//             .then(
//                 Articles.find({ belongs_to: slug }, (err, articles) => {
//                     if (err) { console.log(err); } else { res.json(articles); }
//                 })
//             );
//     }
// });
// };

exports.getAllArticles = (req, res) => {
    Articles.find({})
        .then((articles) => {
            return res.json({ articles });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.getCommentsByArticle = (req, res) => {
    let slug = req.params.article_id;
    console.log(req.params)
    Comments.find({}, (err) => {
        if (err) return res.status(500).send('Its broken');
        else {
            Articles.findById(slug)
                .then(
                    Comments.find({ belongs_to: slug }, (err, Comments) => {
                        if (err) { console.log(err); } else { res.json(Comments); }
                    })
                );
        }
    });
};