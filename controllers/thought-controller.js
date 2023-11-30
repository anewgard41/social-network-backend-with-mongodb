const { Thought, User } = require('../models');
const { db } = require('../models/Thought');

const thoughtController = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find()
                .sort({ createdAt: -1 });
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one thought by id
    async getSingleThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create a thought
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);


            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }

            res.json({ message: "Thought successfully created!" });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update a thought by id
    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                {
                    new: true,
                    runValidators: true
                });

            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }
        } catch {
            res.json(dbThoughtData);

            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete a thought
    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }

            // remove thought from user's thoughts array
            const dbUserData = User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id!" });
            }

            res.json({ message: "Thought successfully deleted!" });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

};

module.exports = thoughtController;