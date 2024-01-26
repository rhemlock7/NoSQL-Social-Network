const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            res.json(thoughts);
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thought.findOne({ _id: req.params.thoughtsId }).select('-__v');

            if (!singleThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            return res.json(singleThought);
        } catch (error) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new thought
    // TODO: Get thoughts connected with Users
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete an existing thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtsId});

            if (!thought) {
                return res.status(404).json({ message: 'No thought exists with that ID' });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // TODO: Update a thought

}