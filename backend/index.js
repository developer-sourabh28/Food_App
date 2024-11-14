const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const mongoDb = require('./db');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;
const _dirname = path.resolve();

// Define allowed origin based on environment
const allowedOrigin = process.env.NODE_ENV === 'production'
    ? 'http://localhost:8000'  // Replace with your actual production URL
    : 'http://localhost:3000';  // For local development

// Apply CORS middleware
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Other middleware
app.use(express.json());

// API routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/menuItemRoutes"));

// Serve static files in production
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

app.get('/', (req, res) => {
    return res.send("Server is running");
});

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");

        // Optionally, seed the database with initial data
        await mongoDb.insertData();
        await mongoDb.insertCatData();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

startServer();
