const { User, Thought } = require("../models");
const { db } = require("../models/Thought");

const userController = {
    // get all users
    async getUsers(req, res) {
        try {
            const dbUserData = await User.find()
            .select("-__v")
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one user by id
    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate("friends")
            .populate("thoughts");

            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update a user by id
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { 
                new: true,
                runValidators: true 
                }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete a user
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }

            // remove user's associated thoughts
            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts }});
            res.json({ message: "User and associated thoughts deleted!" });

        } catch {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add a friend
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove friend from user's friends list
    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

};

module.exports = userController;