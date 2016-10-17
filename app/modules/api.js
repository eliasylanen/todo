const apiRouter = require('express').Router();
const dbTools = require('./dbTools');
const jwt = require('jsonwebtoken');

function listGetter(req, res) {
  dbTools.findList({ owner: req.decoded })
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
  console.log(req.headers);
  const token = req.body.token ||
                req.query.token ||
                req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, req.app.settings.superSecret, (err, decoded) => {
      if (err) {
        next({
          success: false,
          msg: 'Failed to authenticate token',
        });
      }
      req.decoded = decoded;
      console.log(decoded);
      next();
    });
  } else {
    next({
      success: false,
      msg: 'No token provided',
    });
  }
})

// Get all (user's) list items
  .get('/lists', listGetter)
  // Insert new list item
  .post('/lists', (req, res) => {
    dbTools.insertListItem(req.body, req.decoded)
      .then((newItem) => {
        res.json({ success: true, msg: newItem });
      })
      .catch(err => { res.json({ success: false, msg: err }); });
  })
  // Update list item by id
  .put('/lists/:id', (req, res) => {
    dbTools.updateListItem(req.params.id, req.body, req.decoded)
    .then((editedItem) => {
      res.json({ success: true, msg: editedItem });
    })
    .catch(err => { res.json({ success: false, msg: err }); });
  })
  // Delete list item
  .delete('/lists/:id', (req, res) => {
    dbTools.deleteListItem(req.params.id, req.decoded)
    .then((deletedItem) => {
      res.json({ success: true, msg: deletedItem });
    })
    .catch(err => { res.json({ success: false, msg: err }); });
  });

module.exports = apiRouter;
