import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import Task from './Schema/index.mjs';
dotenv.config();

const app = express()
app.use(express.json(), cors(["https://task-maintainer.herokuapp.com/", "http://localhost:3000/"]))

app.get("/tasks", async (_req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

app.get("/task/:id", async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

app.post("/task", async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

app.patch("/task/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true,
        })
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json(new Error(error))
    }
})

app.delete("/task/:id", async (req, res) => {
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
