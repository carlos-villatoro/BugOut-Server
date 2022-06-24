import mongoose from "mongoose";

const BugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    notes:{
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    priority:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'Not Started'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Bug', BugSchema)