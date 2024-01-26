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

    // Create a new thought and push it to User's thoughts array
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            // Update the User's thoughts array
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id } },
                { runValidators: true, new: true },
            );

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete an existing thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtsId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought exists with that ID' });
            }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedThought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create reaction
    async createReaction(req, res) {
        try {
            // Update the Thought's reaction array
            await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { runValidators: true, new: true },
            );

            res.status(200).json('Success');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete reaction by ID
    async deleteReaction(req, res) {
        try {
            const reactionToDelete = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: req.params.reactionId } },
                { new: true }
            );

            if (!reactionToDelete) {
                return res.status(404).json({ message: "Reaction not found" });
            }

            res.status(200).json('Reaction successfully deleted');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}