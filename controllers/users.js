const Users = require('../models/users');

exports.getAllUsers = (req, res) => {
  Users.find({})
    .then((users) => {
      return res.append('Access-Control-Allow-Origin', '*').json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getUser = (req, res) => {
  let { username } = req.params;
  Users.find({ username: username })
    .then((user) => {
      res.append('Access-Control-Allow-Origin', '*').status(200).json(user[0]);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
