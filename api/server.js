const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contentRoutes = require('./routes/content');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});