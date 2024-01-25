const { Thought, User } = require('../models');

module.exports = {
    // TODO: Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },

    // TODO: Get a single thought

    // TODO: Create a new thought

    // TODO: Delete an existing thought

    // TODO: Update a thought

}