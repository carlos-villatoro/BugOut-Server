const mongoose = require ('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    priority: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    bugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }],
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', ProjectSchema)