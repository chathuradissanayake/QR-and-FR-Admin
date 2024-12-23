const Door = require('../models/Door');
const AdminUser = require('../models/AdminUser');
const PermissionRequest = require('../models/PermissionRequest');

const createDoor = async (req, res) => {
  const { doorCode, roomName, qrData, qrImage } = req.body;

  if (!doorCode || !roomName || !qrData) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // Fetch the admin user to get the company details
    const adminUser = await AdminUser.findById(req.user.userId).populate('company');
    if (!adminUser || !adminUser.company) {
      return res.status(400).json({ success: false, message: "Admin user or company not found." });
    }

    const location = adminUser.company.name; // Set the location with the company name

    const newDoor = new Door({
      location,
      doorCode,
      roomName,
      qrData,
      qrImage,
      company: adminUser.company._id, // Attach company ID to the new door
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
    const door = await Door.findOne({ _id: id, company: req.companyId });
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
    const doors = await Door.find({ company: req.companyId }); // Filter by company ID
    res.status(200).json(doors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoor = async (req, res) => {
  const { id } = req.params;
  const { doorCode, roomName, location } = req.body;

  try {
    const updatedDoor = await Door.findOneAndUpdate(
      { _id: id, company: req.companyId },
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
    const deletedDoor = await Door.findOneAndDelete({ _id: id, company: req.companyId });
    if (!deletedDoor) {
      return res.status(404).json({ error: 'Door not found' });
    }
    res.status(200).json({ message: 'Door deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDoor,
  getDoorById,
  getAllDoors,
  updateDoor,
  deleteDoor,
};