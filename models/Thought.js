const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  // set custom id to avoid confusion with parent comment _id
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: 'Reactions must include some text.',
    maxLength: [280, 'Please keep reactions to 280 characters or less.']
  },
  username: {
    type: String,
    required: "Anonymous reactions not permitted."
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
  {
    toJSON: {
      getters: true
    }
  });

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Empty thoughts not permitted.',
    minLength: [1, 'Thoughts must be at least 1 character long.'],
    maxLength: [280, 'Please keep thoughts to 280 characters or less.']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: 'Anonymous thoughts not permitted.'
  },
  reactions: [ReactionSchema]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  });

  ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;