const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const mongoDb = require('./db');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8000;
const _dirname = path.resolve();

const cors = require('cors');
const allowedOrigin = process.env.NODE_ENV === 'production'
    ? 'https://foodapp-4jmt.onrender.com' // Replace `<FoodApp>` with your actual app name
    : 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));

 // mongoDb();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://foodapp-4jmt.onrender.com/");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );    
    next();
})

app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/menuItemRoutes"));  // if using a separate file

app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
})

app.get('/', (req, res) => {
    return res.send("server is running")
})

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");

        // Optionally, seed the database with initial data
        await mongoDb.insertData(); // Ensure this is correctly handled in your db.js file
        await mongoDb.insertCatData();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

startServer();



