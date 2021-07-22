const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required!',
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: 'Email address is required!',
    unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please supply a valid email address!']
  },
  thoughts: [String],
  friends: [String]
},
{
  toJSON: {
    virtuals: true
  },
  id: false
});

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;