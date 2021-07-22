
const thoughtController = {
  getAllThoughts(req, res) {
    res.json({ message: 'getting all thoughts' });
  },

  getThoughtById({ params }, res) {
    res.json({ message: `getting thought with id = ${params.thoughtId}` });
  },

  createThought({ body }, res) {
    res.json({ message: 'creating a thought', body });
  },

  updateThought({ params, body }, res) {
    res.json({ message: `updating thought with id = ${params.thoughtId}`, body });
  },

  deleteThought({ params }, res) {
    res.json({ message: `deleting thought with id = ${params.thoughtId}` });
  },

  addReaction({ params, body }, res) {
    res.json({ message: `adding a reaction to thought with id = ${params.thoughtId}`, body });
  },

  removeReaction({ params }, res) {
    res.json({ message: `deleting reaction with id = ${params.reactionId} from thought with id= ${params.thoughtId}` });
  }
};

module.exports = thoughtController;

