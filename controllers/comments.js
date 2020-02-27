const Comments = require('../models/comments');
const Articles = require('../models/articles');

exports.getCommentsByArticle = (req, res) => {
  let slug = req.params.article_id;
  Comments.find({ belongs_to: slug })
    .then((comments) => {
      res.append('Access-Control-Allow-Origin', '*').json({ comments });
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
      res.append('Access-Control-Allow-Origin', '*').status(201).send({ comment: comment });
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

exports.voteComment = (req, res) => {
  let commentId = req.params.comment_id;
  Comments.findByIdAndUpdate({ _id: commentId }, { $inc: { votes: 1 } }, { new: true })
    .then((comment) => {
      res.append('Access-Control-Allow-Origin', '*').status(200).json({ comment });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.deleteComment = (req, res) => {
  let commentId = req.params.comment_id;
  Comments.findByIdAndRemove({ _id: commentId })
    .then(() => {
      res.append('Access-Control-Allow-Origin', '*').status(201).json({ message: 'Comment deleted!' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
