const express = require('express');
const { uploadContent, getContent } = require('../controllers/contentController');
const { authenticateJWT, checkBlacklist } = require('../middleware/authMiddleware');

const router = express.Router();

// Upload content
router.post('/upload', authenticateJWT, checkBlacklist, uploadContent);

// Stream content by ID
router.get('/stream/:id', authenticateJWT, checkBlacklist, getContent);

module.exports = router;
