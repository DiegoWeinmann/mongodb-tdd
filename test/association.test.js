const mongoose = require('mongoose')
const { expect } = require('chai')

const User = require('../src/models/User')
const BlogPost = require('../src/models/BlogPost')
const Comment = require('../src/models/Comment')

describe.only('Associations...', () => {
	let joe, blogPost, comment

	beforeEach(async () => {
		joe = new User({ name: 'Joe' })
		blogPost = new BlogPost({ title: 'JS is Great', content: 'yes it is' })
		comment = new Comment({ content: 'Great post!' })

		joe.blogPosts.push(blogPost)
		blogPost.comments.push(comment)
		comment.user = joe

		return Promise.all([joe.save(), blogPost.save(), comment.save()])
	})

	it('saves a relation between a user and a blogpost', async () => {
		return User.findOne({ name: 'Joe' })
			.populate('blogPosts')
			.then((user) => {
				expect(user.blogPosts.length).to.equal(1)
				expect(user.blogPosts[0].title).to.equal(blogPost.title)
			})
	})

	it('saves a full relation graph', async () => {
		return User.findOne({ name: 'Joe' })
			.populate({
				model: 'BlogPost',
				path: 'blogPosts',
				populate: {
					model: 'Comment',
					path: 'comments',
					populate: {
						path: 'user',
						model: 'User',
					},
				},
			})
			.then((user) => {
        //console.log(JSON.stringify(user, null, 2))
				expect(user.blogPosts[0].title).to.equal(blogPost.title)
        expect(user.blogPosts[0].comments[0].content).to.equal(comment.content)
				expect(user.blogPosts[0].comments[0].user.name).to.equal(joe.name)
			})
	})
})
