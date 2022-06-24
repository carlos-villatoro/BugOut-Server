const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	projects: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	}],
	role: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('User', UserSchema)