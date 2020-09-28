const { expect } = require('chai')
const User = require('../src/models/User')
const BlogPost = require('../src/models/BlogPost')

describe.only('Middleware...', () => {
	let joe, blogPost

	beforeEach(() => {
		joe = new User({ name: 'Joe' })
		blogPost = new BlogPost({ title: 'JS is Great', content: 'yes it is' })

		joe.blogPosts.push(blogPost)

		return Promise.all([joe.save(), blogPost.save()])
	})

	it('users cleanup dangling blogPosts on remove', async () => {
		return joe
			.remove()
			.then(() => BlogPost.count())
			.then((count) => {
				expect(count).to.equal(0)
			})
	})
})
