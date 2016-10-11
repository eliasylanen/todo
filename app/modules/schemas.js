const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

/*
 * User
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
    unique: 'Two users cannot share the same username',
  },
  password: {
    type: String,
    required: true,
    get: v => v,
    set: v => Buffer.from(v).toString('base64'),
  },
});

userSchema.plugin(beautifyUnique);
const User = mongoose.model('User', userSchema);

/*
 * List and ListItem
 */
const ListItem = new mongoose.Schema({
  done: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    min: 1,
    max: 3,
  },
});

const listSchema = new mongoose.Schema({
  item: [ListItem],
  owner: {
    type: String,
    lowercase: true,
    ref: 'User',
    required: true,
    unique: 'Only one list / user',
  },
});

listSchema.plugin(beautifyUnique);
const List = mongoose.model('List', listSchema);

module.exports = {
  User,
  List,
};
