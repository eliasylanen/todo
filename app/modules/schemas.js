const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
    unique: 'Two users cannot share the same username',
  },
  password: {
    type: String,
    lowercase: true,
    required: true,
    get: v => v,
    set: v => Buffer.from(v).toString('base64'),
  },
});
userSchema.plugin(beautifyUnique);

const User = mongoose.model('User', userSchema);

const ListItem = new mongoose.Schema({
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

const List = mongoose.model('List', new mongoose.Schema({
  item: [ListItem],
  owner: {
    type: String,
    lowercase: true,
    ref: 'User',
    required: true,
  },
}));

module.exports = {
  User,
  List,
};
