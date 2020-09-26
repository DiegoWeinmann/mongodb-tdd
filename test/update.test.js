const { expect } = require('chai')
const User = require('../src/models/User')

describe('Updating users...', () => {
	let joe

	beforeEach(async () => {
		joe = new User({ name: 'Joe' })
		return joe.save()
	})

	it('document set and save', async () => {
		const newName = 'test'
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
})
