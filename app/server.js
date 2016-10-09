const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbTools = require('./modules/dbTools');
const apiRouter = require('./modules/api');

const app = express();
const port = 8080 || process.env.PORT;

mongoose.connect(dbTools.database);

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(morgan('dev'))

  .set('views', './app/client')
  .set('view engine', 'pug')

  .get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
  })

  .use('/api', apiRouter)

  .listen(port, () => {
    console.log(`Listening in ${port}`);
  });
