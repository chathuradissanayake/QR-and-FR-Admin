const express = require('express');
const { registerUser, getAllUsers, getUserById, updateUserById, deleteUserById,removeDoorAccess, getUserHistoryById } = require('../controllers/authController');
const router = express.Router();

// Create a new user
router.post('/register', registerUser);

// Get all users
router.get('/', getAllUsers);

// Get user by _id
router.get('/:id', getUserById);

// Get user history by _id
router.get('/:id/history', getUserHistoryById);

// Update user by _id
router.put('/:id', updateUserById);

// Delete user by _id
router.delete('/:id', deleteUserById);

// Remove door access
router.delete('/:userId/doorAccess/:doorAccessId', removeDoorAccess);


module.exports = router;