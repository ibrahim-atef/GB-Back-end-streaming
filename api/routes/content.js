const express = require('express');
const { uploadContent, getContent } = require('../controllers/contentController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Upload content
router.post('/upload', verifyToken, uploadContent);

// Stream content by ID
router.get('/:id', verifyToken, getContent);

module.exports = router;
