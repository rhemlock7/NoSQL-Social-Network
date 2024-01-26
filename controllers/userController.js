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
            const singleUser = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts');

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
            const user = (await User.create(req.body));
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a single user by ID
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Deletes an existing user and that user's thoughts
    async deleteUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId }).select('-__v')

            // Find all thoughts associated with the user and delete them
            const deletedThoughts = await Thought.deleteMany({ username: singleUser.username });

            if (deletedThoughts.deletedCount === 0) {
                return res.status(404).json({ message: 'User deleted, but no thoughts found' });
            }

            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user exists with that ID' });
            }

            res.json({ message: 'User and their thoughts successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create addFriend
    async addFriend(req, res) {
        try {
            // Update the User's friends array
            await User.findByIdAndUpdate(
                req.params.userId,
                { $push: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            );

            res.status(200).json('Success');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // TODO: Create removeFriend
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json('Success');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}