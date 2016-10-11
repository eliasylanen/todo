const schemas = require('./schemas');
const mongoose = require('mongoose');

const database = 'mongodb://dbuser:testpass@ds021356.mlab.com:21356/todolist';

function findUser(searchParam) {
  return schemas.User.findOne(searchParam);
}

function findList(searchParam) {
  return schemas.List.find(searchParam);
}

function insertUser(insertData) {
  const newUser = new schemas.User(insertData);
  const newList = new schemas.List({ owner: insertData.username });
  return Promise.all([newUser.save(), newList.save()]);
}

function insertListItem(insertData, owner) {
  console.log('hi');
  return schemas.List.update(
    { owner },
    { $push: { item: insertData } });
}

function updateListItem(id, insertData, owner) {
  return schemas.List.update(
    {
      'item._id': new mongoose.Types.ObjectId(id),
      owner,
    },
    { $set: {
      'item.$.done': insertData.done,
      'item.$.content': insertData.content,
      'item.$.priority': insertData.priority,
    },
  });
}

function deleteListItem(id, owner) {
  return schemas.List.update(
    { owner },
    {
      $pull: {
        item: { _id: new mongoose.Types.ObjectId(id) },
      },
    }
  );
}

module.exports = {
  schemas,
  database,
  findUser,
  findList,
  insertUser,
  insertListItem,
  updateListItem,
  deleteListItem,
};
