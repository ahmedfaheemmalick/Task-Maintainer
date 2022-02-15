import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided.'],
        trim: true,
    },
    desc: {
        type: String,
        required: [true, 'Description must be provided.'],
        trim: true,
    },
    completed: {
        type: Boolean,
        required: [true, 'Please select weather task has completed or not.'],
        default: false,
    },
    createdAt: {
        type: String,
    }
})

export default mongoose.model('Task', TaskSchema)