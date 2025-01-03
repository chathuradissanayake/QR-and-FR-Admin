const Door = require('../models/Door');
const PermissionRequest = require('../models/PermissionRequest');

const createDoor = async (req, res) => {
  const { location, doorCode, roomName, qrData, qrImage, status} = req.body;

  if (!location || !doorCode || !roomName || !qrData  ) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const newDoor = new Door({
      location,
      doorCode,
      roomName,
      qrData,
      qrImage,
      status,
    });

    await newDoor.save(); // Save to database
    
    res.status(201).json({ success: true, message: "QR Code saved successfully!" });
  } catch (error) {
    console.error("Error saving QR Code:", error);
    res.status(500).json({ success: false, message: "Error saving QR Code." });
  }
};


const getDoorById = async (req, res) => {
  const { id } = req.params;

  try {
    const door = await Door.findById(id);
    if (!door) {
      return res.status(404).json({ error: 'Door not found' });
    }

    const approvedRequests = await PermissionRequest.find({ door: id, status: 'Approved' }).populate('user', 'firstName lastName');

    res.status(200).json({ door, approvedRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDoors = async (req, res) => {
  try {
    const doors = await Door.find();
    res.status(200).json(doors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoor = async (req, res) => {
  const { id } = req.params;
  const { doorCode, roomName, location } = req.body;

  try {
    const updatedDoor = await Door.findByIdAndUpdate(
      id,
      { doorCode, roomName, location },
      { new: true, runValidators: true }
    );
    if (!updatedDoor) {
      return res.status(404).json({ error: 'Door not found' });
    }
    res.status(200).json(updatedDoor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDoor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoor = await Door.findByIdAndDelete(id);
    if (!deletedDoor) {
      return res.status(404).json({ error: 'Door not found' });
    }
    res.status(200).json({ message: 'Door deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setdoorstatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedDoor = await Door.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    if (!updatedDoor) {
      return res.status(404).json({ error: 'Door not found' });
    }
    res.json(updatedDoor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createDoor,
  getDoorById,
  getAllDoors,
  updateDoor,
  deleteDoor,
  setdoorstatus,
};