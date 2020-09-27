const { expect } = require('chai')
const User = require('../src/models/User')

describe('Updating users...', () => {
	let joe
	let newName

	beforeEach(async () => {
		joe = new User({ name: 'Joe' })
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

	it('Model updateOne', () => {
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
})
