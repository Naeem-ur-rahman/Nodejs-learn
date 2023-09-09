const express = require('express');
const {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser,
} = require('../controllers/user')

const router = express.Router();

router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserByID)
    .delete(handleDeleteUserByID)


module.exports = router;