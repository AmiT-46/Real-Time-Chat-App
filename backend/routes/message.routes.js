const express = require('express');
const { sendMessage, getMessages, clearMessages } = require('../controllers/message.controller.js');
const protectRoute = require('../middleware/protectRoute.js');

const router = express.Router();

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage); // receivers id in the params
router.delete("/clear/:id", protectRoute, clearMessages);

module.exports = router;