const router = require('express').Router();

// TODO: Add controller functions here


// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeThought);


module.exports = router;