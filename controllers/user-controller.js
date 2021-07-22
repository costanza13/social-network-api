
const userController = {
  getAllUsers(req, res) {
    res.json({ message: 'getting all users' });
  },

  getUserById({ params }, res) {
    res.json({ message: `getting user with id = ${params.userId}` });
  },

  createUser({ body }, res) {
    res.json({ message: 'creating a user', body });
  },

  updateUser({ params, body }, res) {
    res.json({ message: `updating user with id = ${params.userId}`, body });
  },

  deleteUser({ params }, res) {
    res.json({ message: `deleting user with id = ${params.userId}` });

    // BONUS: Remove a user's associated thoughts when deleted.
  },

  addFriend({ params }, res) {
    res.json({ message: `adding a friend to user with id = ${params.userId}` });
  },

  removeFriend({ params }, res) {
    res.json({ message: `removing friend with id = ${params.friendId} from user with id= ${params.userId}` });
  }
};

module.exports = userController;

