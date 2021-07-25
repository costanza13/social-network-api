const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: { _id: false, __v: false }
      })
      .select('-__v')
      .sort({ createdAt: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ creeatedAt: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought({ body }, res) {
    User.findOne({ _id: body.userId })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: `User [ ${body.username} ] not found!` });
          return;
        }
        return Thought.create(body);
      })
      .then(({ id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: id } },
          { new: true }
        )
          .select('-__v');
      })
      .then(dbUserData => {
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      body,
      { new: true, runValidators: true }
    )
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { username: deletedThought.username },
          { $pull: { thoughts: deletedThought._id } },
          { new: true }
        )
          .select('-__v');
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(updatedThought => {
        if (!updatedThought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(updatedThought);
      })
      .catch(err => res.json(err));
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'reactions',
        select: { __v: false, _id: false }
      })
      .select('-__v')
      .then(updatedThought => {
        if (!updatedThought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(updatedThought);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;

