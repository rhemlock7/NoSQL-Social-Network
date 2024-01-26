const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getSingleThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId/reactions
router.route('/:thoughtId/reactions').post(createReaction)

// /api/thoughts/:thoughtsId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought).delete(deleteThought).put(updateThought);


module.exports = router;