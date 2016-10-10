const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbTools = require('./modules/dbTools');
const jwt = require('jsonwebtoken');
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
  .set('superSecret', 'todoSecret')

  .get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
  })

  .post('/register', (req, res) => {

  })

  .post('/login', (req, res, next) => {
    dbTools.User.findOne({ username: req.body.name }, (err, user) => {
      if (err) next(err);
      if (!user) {
        res.json({ success: false, msg: 'User not found' });
      } else if (user) {
        if (user.password !== req.body.password) {
          res.json({ success: false, msg: 'Invalid login' });
        } else {
          const token = jwt.sign(
          user.name,
          req.app.settings.superSecret
        );
          res.json({
            success: true,
            message: token,
          });
        }
      }
    });
  })

  .use('/api', apiRouter)

  .use((err, req, res, next) => {
    res.json(err);
  })

  .listen(port, () => {
    console.log(`Listening in ${port}`);
  });
