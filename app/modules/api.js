const apiRouter = require('express').Router();
const dbTools = require('./dbTools');
const jwt = require('jsonwebtoken');

function userGetter(req, res) {
  let searchParam = {};
  if (req.params.id) searchParam = { _id: req.params.id };
  dbTools.findUser(searchParam)
    .then(users => { res.json({ success: true, msg: users }); })
    .catch(err => { res.json({ success: false, msg: err }); });
}

function listGetter(req, res) {
  // const searchParam = {};
  // // if (req.params.user) {
  // //   searchParam = { owner: req.params.user };
  // // }
  dbTools.findList({ owner: 'pepetopo' })
    .then(lists => { res.json({ success: true, msg: lists }); })
    .catch(err => { res.json({ success: false, msg: err }); });
}

apiRouter
  .get('/', (req, res) => {
    res.end('Nothing here');
  })

/*
 * Authorization
 */
.use((req, res, next) => {
  const token = req.body.token ||
                req.query.token ||
                req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, req.app.settings.superSecret, (err, decoded) => {
      if (err) {
        next({
          success: false,
          msg: 'Failed to authenticate token.',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    next({
      success: false,
      msg: 'No token provided',
    });
  }
})

/*
 * User routes
 */
  // Get all users
  .get('/users', userGetter)
  // Get certain user by id
  .get('/users/:user', userGetter)
  // Insert new user
  .post('/users', (req, res) => {
    dbTools.insertUser(req.body)
      .then(() => { res.json({ success: true }); })
      .catch(err => { res.json({ success: false, msg: err }); });
  })

/*
 * List routes
 */
  // Get all (user's) list items
  .get('/lists', listGetter)
  // Insert new list item
  .post('/lists', (req, res) => {
    dbTools.insertListItem(req.body)
      .then((newItem) => {
        res.json({ success: true, msg: newItem });
      })
      .catch(err => { res.json({ success: false, msg: err }); });
  })
  // Update list item by id
  .put('/lists/:id', (req, res) => {
    dbTools.updateListItem(req.params.id, req.body)
    .then((editedItem) => {
      res.json({ success: true, msg: editedItem });
    })
    .catch(err => { res.json({ success: false, msg: err }); });
  })
  // Delete list item
  .delete('/lists/:id', (req, res) => {
    dbTools.deleteListItem(req.params.id, req.body)
    .then((deletedItem) => {
      res.json({ success: true, msg: deletedItem });
    })
    .catch(err => { res.json({ success: false, msg: err }); });
  });

module.exports = apiRouter;
