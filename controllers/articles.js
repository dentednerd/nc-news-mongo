const Articles = require('../models/articles');

exports.getArticlesByTopic = (req, res, next) => {
  let { topic_id } = req.params;
  Articles.find({ belongs_to: topic_id })
    .then((articles) => {
      if (articles.length < 1) {
        return next({ status: 404, message: 'Topic not found' });
      }
      res.append('Access-Control-Allow-Origin', '*').status(200).json({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res) => {
  let { article_id } = req.params;
  Articles.find({ _id: article_id })
    .then((articles) => {
      return res.append('Access-Control-Allow-Origin', '*').json({ articles });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getAllArticles = (req, res) => {
  Articles.find({})
    .then((articles) => {
      return res.append('Access-Control-Allow-Origin', '*').json({ articles });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
