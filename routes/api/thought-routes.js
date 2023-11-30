const router = require('express').Router();
// importing methods created in thoughts controller
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts route
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId route
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions route
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId route
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

