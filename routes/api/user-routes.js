const router = require('express').Router();
// importing methods created in users controller
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// api/users route 
router.route('/').get(getUsers).post(createUser);

// api/users/:userId route
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/:friendId route
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

// userIds for testing:
// 6567b5649b15831dc4574cba
// 6567b59a9b15831dc4574cbc
// 6567b5ab9b15831dc4574cbe
// 6567b5ba9b15831dc4574cc0
// 656808885720197eb48f8d78 -- Larry
