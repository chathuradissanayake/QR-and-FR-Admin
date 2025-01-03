const express = require('express');
const router = express.Router();
const doorController = require('../controllers/doorController');

// Route to create a new door
router.post('/create', doorController.createDoor);

// Route to get a door by ID
router.get('/:id', doorController.getDoorById);

// Route to get all doors
router.get('/', doorController.getAllDoors); 

// Route to update a door by ID
router.put('/:id', doorController.updateDoor);

// Route to delete a door by ID
router.delete('/:id', doorController.deleteDoor);

//set door status
router.put('/:id/status', doorController.setdoorstatus);

module.exports = router;