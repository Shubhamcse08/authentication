import express from "express";
import cors from 'cors';
import connectDB from "./config/db.js";

import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json())
app.use(cors());
app.use("/api/auth",authRoutes);

// connect db
connectDB()

app.get("/",(req,res)=>{
    res.send("API is running...")
})

export default app;
