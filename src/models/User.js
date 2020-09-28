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

UserSchema.pre('remove', async function(next) {
  const BlogPost = mongoose.model('BlogPost')  
  BlogPost.deleteMany({ _id: { $in: this.blogPosts } })
    .then(results => {
      console.log(results)
      next()
    })
})

const User = mongoose.model('User', UserSchema)

module.exports = User
