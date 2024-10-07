const Content = require('../models/content');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const streamifier = require('streamifier');

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'streaming_content',
        resource_type: 'video'
    }
});

const upload = multer({ storage });

exports.uploadContent = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { title, contentId, type } = req.body;

        try {
            const url = req.file.path;
            const newContent = new Content({ title, url, contentId, type });
            await newContent.save();
            res.status(201).json(newContent);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

exports.getContent = async (req, res) => {
    try {
        const content = await Content.findOne({ contentId: req.params.id });
        if (!content) return res.status(404).json({ message: 'Content not found' });
        
        res.json({ url: content.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
