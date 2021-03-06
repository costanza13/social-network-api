const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .sort({ username: 1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .select('-__v')
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
    .select('-__v')
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id! ' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id! ' });
          return;
        }
        // remove user's thoughts
        Thought.deleteMany({ username: dbUserData.username })
          .then(() => {
            res.json({ message: `User ${dbUserData.username} and associated thoughts deleted.` });
          });
      })
      .catch(err => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    User.findOne({ _id: params.friendId })
      .then(dbFriendData => {
        if (!dbFriendData) {
          res.status(404).json({ message: `No user found with id ${params.friendId}!` });
          return;
        }
        const friendId = dbFriendData._id;
        return User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: friendId } }, { new: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id! ' });
              return;
            }
            res.json(dbUserData);
          })
      })
      .catch(err => res.status(400).json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id! ' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;

