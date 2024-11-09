const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

//Database connection
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log("Database connected"))
	.catch((err) => console.error("MongoDB connection error:", err))

//Routes
app.get("/", (req, res) => {
	res.send("Welcome to FYC");
});

const authRoutes = require('./routes/authRoutes');
app.use("/api/auth", authRoutes);

//Port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));


