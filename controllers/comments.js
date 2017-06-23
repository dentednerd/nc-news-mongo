const Comments = require('../models/comments');
const Articles = require('../models/articles');

exports.getCommentsByArticle = (req, res) => {
    let slug = req.params.article_id;
    Comments.find({ belongs_to: slug })
        .then((comments) => {
            res.json({ comments });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.postNewComment = (req, res) => {
    let articleId = req.params.article_id;
    let comment = new Comments({
        body: req.body.comment,
        belongs_to: articleId
    });
    comment
        .save()
        .then((comment) => {
            res.send({ comment: comment });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.voteArticle = (req, res) => {
    let articleId = req.params.article_id;
    // let vote = req.query.vote;
    Articles.findByIdAndUpdate({ _id: articleId }, { $inc: { votes: 1 } }, { new: true })
        .then((article) => {
            res.status(200).json({ article });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};