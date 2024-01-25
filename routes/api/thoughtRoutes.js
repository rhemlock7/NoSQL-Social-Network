const router = require('express').Router();


// TODO: Add controller functions here


// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

module.exports = router;