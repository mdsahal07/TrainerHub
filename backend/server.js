import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import socketHandler from './socket/socketHandler.js';
dotenv.config();
import seedAdmin from './utils/seedAdmin.js';


// import Routes
import authRoutes from './routes/authRoutes.js';
import clientDash from './routes/client/dashRoutes.js';
import profileRoute from './routes/profileRoutes.js';
import searchRoute from './routes/client/searchRoutes.js';
import trainerRoute from './routes/client/trainerRoute.js';
import videoCallRoute from './routes/videoCallRoutes.js';
import trainerDash from './routes/trainer/trainerDash.js';
import handleReq from './routes/handleReq.js';
import scheduler from './routes/trainer/scheduleRoute.js';
import notification from './routes/notify.js';
import clientProf from './routes/trainer/clientProf.js';
import admin from './routes/admin.js';
import report from './routes/reportRoute.js';
import weight from './routes/client/weightRoute.js';
import rating from './routes/rateRoute.js';

const app = express();
const server = http.createServer(app); //creating http server for socket.io
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
app.use(express.json());
app.use(cors());

// use Routes
app.get("/", (req, res) => {
	res.send("Welcome to TrainerHub");
});
app.use("/auth", authRoutes);
app.use("/clientDash", clientDash);
app.use("/trainerDash", trainerDash);
app.use("/user", profileRoute);
app.use("/search", searchRoute);
app.use("/trainer", trainerRoute);
app.use("/videocall", videoCallRoute);
app.use("/request", handleReq);
app.use("/schedule", scheduler);
app.use("/notify", notification);
app.use("/clients", clientProf);
app.use("/admin", admin);
app.use("/report", report);
app.use("/weight", weight);
app.use("/ratings", rating);

// WebSocket Setup
socketHandler(io)

seedAdmin();
//Database connection
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log("Database connected"))
	.catch((err) => console.error("MongoDB connection error:", err))

//Port 
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} `));

export { io, server }
