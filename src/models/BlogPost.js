const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	content: {
		type: String,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost
