process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const server = require('../server');
const saveTestData = require('../seed/test.seed');
const mongoose = require('mongoose');

describe('API', function () {
  this.timeout(10000);
  let usefulData;
  before((done) => {
    mongoose.connection.dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
        console.log(`Useful data: ${Object.keys(usefulData)}`);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  after(() => {
    mongoose.disconnect();
    process.exit();
  });

  describe('GET /', function () {
    it('responds with status code 200', function (done) {
      request(server)
        .get('/api')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            done();
          }
        });
    });
  });
  describe('GET /api/topics', function () {
    it('returns a list of topics', function (done) {
      request(server)
        .get('/api/topics')
        .end((err, res) => {
          if (err) res.status(500);
          else {
            expect(res.status).to.equal(200);
            expect(res.body.topics.length).to.equal(3);
            done();
          }
        });
    });
  });
  describe('GET /api/topics/:topic_id/articles', function () {
    it('returns a list of articles from a single topic', function (done) {
      request(server)
        .get(`/api/topics/football/articles`)
        .end((err, res) => {
          if (err) res.status(500);
          else {
            expect(res.status).to.equal(200);
            expect(res.body.articles.length).to.equal(1);
            done();
          }
        });
    });
  });
  describe('GET /api/articles', function () {
    it('returns a list of all articles', function (done) {
      request(server)
        .get('/api/articles')
        .end((err, res) => {
          if (err) res.status(500);
          else {
            expect(res.status).to.equal(200);
            expect(res.body.articles.length).to.equal(2);
            done();
          }
        });
    });
  });
  describe('GET /api/articles/:article_id/comments', function () {
    it('returns a list of comments from a single article', function (done) {
      // console.log(usefulData);
      let articleId = usefulData.comments[0].belongs_to;
      console.log('articleId: ' + articleId);
      request(server)
        .get(`/api/articles/${articleId}/comments`)
        .end((err, res) => {
          if (err) res.status(500);
          else {
            expect(res.status).to.equal(200);
            expect(res.body.comments.length).to.equal(2);
            expect(res.body.comments).to.be.an('array');
            done();
          }
        });
    });
  });

  describe('POST /api/articles/:article_id/comments', function () {
    it('adds a new comment to an article', function (done) {
      console.log(usefulData);
      let articleId = usefulData.comments[0].belongs_to;
      request(server)
        .post(`/api/articles/${articleId}/comments`)
        .send({ comment: "Hello Phil" })
        .end((err, res) => {
          if (err) res.status(500);
          else {
            expect(res.status).to.equal(201);
            expect(res.body.comment.body).to.equal("Hello Phil");
          }
          done();
        });

    });
  });

  describe('PUT /api/articles/:article_id', function () {
    it('increments or decrements the votes of an article by 1', function (done) {
      console.log('votes: ' + usefulData.articles[0].votes);
      let articleId = usefulData.articles[0]._id;
      request(server)
        .put(`/api/articles/${articleId}?vote=up`)
        .end((err, res) => {
          if (err) res.status(500);
          else {
            console.log(res.body);
            expect(res.status).to.equal(200);
            expect(res.body.article.votes).to.equal(1);
          }
          done();
        });
    });
  });

  describe('GET /api/users/:username', function () {
    it('returns a single user', function (done) {
      request(server)
        .get(`/api/users/northcoder`)
        .end((err, res) => {
          if (err) res.status(500);
          else {
            console.log('user:', res.body);
            expect(res.status).to.equal(200);
            expect(res.body.username).to.equal('northcoder');
          }
          done();
        });
    });
  });
});
