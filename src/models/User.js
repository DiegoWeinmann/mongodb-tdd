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
	posts: {
		type: [PostSchema],
  },
  blogPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]
})

UserSchema.virtual('postCount').get(function() {
	return this.posts.length
})

const User = mongoose.model('User', UserSchema)

module.exports = User
