const { expect } = require('chai')
const User = require('../src/models/User')

describe('Updating users...', () => {
	let joe
	let newName

	beforeEach(async () => {
		joe = new User({ name: 'Joe', postCount: 0 })
		newName = 'test'
		return joe.save()
	})

	it('document set and save', async () => {
		joe.set('name', newName)
		return joe
			.save()
			.then(() => {
				return User.find({})
			})
			.then((users) => {
				expect(users.length).to.equal(1)
				expect(users[0].name).to.equal(newName)
			})
	})

	it('Model updateOne', async () => {
		return User.updateOne({ name: 'Joe' }, { name: newName })
			.then(() => {
				return User.find({})
			})
			.then((users) => {
				expect(users.length).to.equal(1)
				expect(users[0].name).to.equal(newName)
			})
	})

	it('Model findByIdAndUpdate', async () => {
		return User.findByIdAndUpdate(joe._id, { name: newName })
			.then(() => {
				return User.find({})
			})
			.then((users) => {
				expect(users.length).to.equal(1)
				expect(users[0].name).to.equal(newName)
			})
	})

	it('can increment the post count by 1', async () => {
		joe.posts.push({ title: 'new post' })
		return joe
			.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				expect(user.postCount).to.equal(1)
			})
	})
})
