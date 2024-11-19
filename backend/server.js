const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profRoutes = require('./routes/profileRoutes');
const slotRoutes = require('./routes/slotRoutes');
const rateRoutes = require('./routes/ratingRoute');
const fbRoutes = require('./routes/feedbackRoute');
const app = express();
app.use(express.json());

//Routes
app.get("/", (req, res) => {
	res.send("Welcome to FYC");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", profRoutes);
app.use("/api/users", slotRoutes);
app.use("/api/ratings", rateRoutes);
app.use("/api/feedback", fbRoutes);

//Database connection
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log("Database connected"))
	.catch((err) => console.error("MongoDB connection error:", err))

//Port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));


