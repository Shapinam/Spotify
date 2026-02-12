import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express';
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songsRoutes from "./routes/songs.route.js";
import albumsRoutes from "./routes/albums.route.js";
import statsRoutes from "./routes/stats.route.js";





dotenv.config();

const app = express();
const PORT = process.env.PORT;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer =createServer(app);
initializeSocket(httpServer);

app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true,
    }
));

app.use(express.json());//to parse req.body in authController
app.use(clerkMiddleware());//this will enable the usage of some methods in clerk auth services like req.userId ...
//uploading files before the routes 
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"tmp"),//create a tmp folder to store imgs in it under the path directory of the backend 
    createParentPath: true,//create tmp for the first time if not already found 
    limits:{
        fileSize: 10*1024*1024,//10mb max for any img uploaded
    },
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs",songsRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statsRoutes);

//error handler middleware
//if Mode_env not production print the error for the developer 
app.use((err,req,res,next)=>{
    res.status(500).json({message: process.env.MODE_ENV ==="production"?"internal server error":err.message});
});


httpServer.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
    connectDB();
});
