const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUser, userStatusChange } = require('../controller/users');


router.route('/users').get(getAllUsers);
router.route('/users/:selectedIds').get(getUserById)
router.route('/users/delete').delete(deleteUser)
router.route('/users/status_change').put(userStatusChange);


module.exports = router