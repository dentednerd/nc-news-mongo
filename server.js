if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const morgan = require('morgan'); // logging
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;
const router = require('./routes/index');

mongoose.connect(db, function(err) {
  if (!err) console.log(`Successfully connected to ${db}`);
}).catch((err) => console.log('Error connecting to database: ', err));

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(PORT, function() {
  console.log(`Express server listening on port ${PORT}`);
});

module.exports = app;
