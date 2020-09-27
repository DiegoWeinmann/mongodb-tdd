const { expect } = require('chai')
const User = require('../src/models/User')

describe('Subdocuments...', () => {
	it('can create a subdocument', async () => {
		const newPost = { title: 'new post' }
		const joe = new User({
			name: 'Joe',
			posts: [newPost],
		})
		return joe.save().then(() => {
			expect(joe.posts.length).to.equal(1)
			expect(joe.posts[0].title).to.equal(newPost.title)
		})
	})

	it('can add subdocuments to an existing document', async () => {
		const newPost = { title: 'new post' }
		const joe = new User({ name: 'Joe', posts: [] })
		return joe
			.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				user.posts.push(newPost)
				return user.save()
			})
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				expect(Array.isArray(user.posts)).to.be.true
				expect(user.posts.length).to.equal(1)
			})
	})

	it('can remove an existing subdocument', async () => {
		const joe = new User({ name: 'Joe', posts: [{ title: 'New Title' }] })
		return joe
			.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				const index = user.posts.findIndex((post) => post.title === 'New Title')
				const post = user.posts[index]
				post.remove()
				return user.save()
			})
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				expect(user.posts.length).to.equal(0)
			})
	})
})
