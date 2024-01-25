const router = require('express').Router();


// TODO: Add controller functions here


// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;