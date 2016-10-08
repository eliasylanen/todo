const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = 8080 || process.env.PORT;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(morgan('dev'))

  .set('views', './app/client')
  .set('view engine', 'pug')

  .get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
  })

  .listen(port);
