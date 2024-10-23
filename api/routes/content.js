const express = require('express');
const { uploadContent, getContent } = require('../controllers/contentController');
const { authenticateJWT, checkBlacklist } = require('../middleware/authMiddleware');

const router = express.Router();

// Upload content
router.post('/upload',   uploadContent);

// Stream content by ID
router.get('/stream/:id',   getContent);

module.exports = router;
