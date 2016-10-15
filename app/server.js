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
  .use(express.static('app/client/src'))
  .use(express.static('app/client/style'))

  .set('views', './app/client')
  .set('view engine', 'pug')
  .set('superSecret', 'todoSecret')

  .get('/', (req, res) => {
    res.render('index');
  })

  .post('/login', (req, res, next) => {
    const username = req.body.username.toLowerCase();
    const password = Buffer.from(req.body.password).toString('base64');
    dbTools.findUser({ username })
      .then(user => {
        if (!user) {
          res.json({ success: false, msg: 'User not found' });
        } else if (user) {
          if (user.password !== password) {
            res.json({ success: false, msg: 'Invalid login' });
          } else {
            const token = jwt.sign(
            user.username,
            req.app.settings.superSecret
          );
            res.json({
              success: true,
              message: token,
            });
          }
        }
      })
      .catch(err => { console.log(err); next(err); });
  })

  .post('/register', (req, res) => {
    dbTools.insertUser(req.body)
      .then(() => { res.json({ success: true }); })
      .catch(err => { res.json({ success: false, msg: err }); });
  })

  .use('/api', apiRouter)

  .use((err, req, res, next) => {
    res.json(err);
  })

  .listen(port, () => {
    console.log(`Listening in ${port}`);
  });
