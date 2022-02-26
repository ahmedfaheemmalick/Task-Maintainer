import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import Task from './Model/index.js';

dotenv.config();
const app = express()

app.use(express.static("./Client/build"), cors(), express.json());


app.get("/api/tasks", async (_req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

app.get("/api/task/:id", async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

app.post("/api/task", async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, createdAt: new Date() })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

app.patch("/api/task/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true,
        })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

app.delete("/api/task/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndDelete(req.params.id)
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(process.env.PORT || 4000))
