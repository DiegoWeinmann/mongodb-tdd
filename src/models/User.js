const mongoose = require('mongoose')
const PostSchema = require('./PostSchema')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required.'],
		validate: {
			validator: (name) => name.length > 2,
			message: 'The name must be at least 3 characters long.',
		},
	},
  postCount: Number,
  posts: {
    type: [PostSchema]
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
