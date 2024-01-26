const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUser(req, res) {
        try {
            const users = await User.find().select('-__v');
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single user by ID
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId }).select('-__v');

            if (!singleUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            return res.json(singleUser);
        } catch (error) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // TODO: Update a single user by ID

    // Deletes an existing user 
    // TODO: remove their thoughts when user gets deleted
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});

            if (!user) {
                return res.status(404).json({ message: 'No user exists with that ID' });
            }

            // const thoughts = await Thought.findOneAndDelete(
            //     { students: req.params.userId },
            //     { $pull: { students: req.params.studentId } },
            //     { new: true }
            // );

            // if (!thoughts) {
            //     return res.status(404).json({
            //         message: 'User deleted, but no thoughts found',
            //     });
            // }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

}