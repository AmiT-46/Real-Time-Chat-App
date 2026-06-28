const express = require('express');
const protectRoute = require('../middleware/protectRoute');
const { getUsersForSidebar, updateProfile, deleteProfile, changePassword } = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.put("/profile", protectRoute, updateProfile);
router.delete("/profile", protectRoute, deleteProfile);
router.put("/change-password", protectRoute, changePassword);

module.exports = router;