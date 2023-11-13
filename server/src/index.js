import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {userRouter} from "./routes/users.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(
    "mongodb+srv://goldengliu:GYUZFU40CzVWKg1n@cluster.x1evija.mongodb.net/Cluster?retryWrites=true&w=majority"
);
app.listen(3000, () => console.log("Server Started!"));