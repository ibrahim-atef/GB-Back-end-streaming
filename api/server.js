const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contentRoutes = require('./routes/content');
const cors = require('cors');  // Import the cors package

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Log the Mongo URI
console.log('Mongo URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
app.use(cors({
    origin: 'http://localhost:3343',  
    credentials: true  
}));
app.use(express.json());
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
