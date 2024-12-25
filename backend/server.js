const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const clientDashboard = require('./routes/dashRoutes');
const app = express();
app.use(express.json());
app.use(cors());
//Routes
app.get("/", (req, res) => {
	res.send("Welcome to TrainerHub");
});
app.use("/auth", authRoutes);
app.use("/dashboard", clientDashboard);
//Database connection
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log("Database connected"))
	.catch((err) => console.error("MongoDB connection error:", err))

//Port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));


