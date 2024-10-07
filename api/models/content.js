const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['free', 'prime'], required: true },
    contentId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
