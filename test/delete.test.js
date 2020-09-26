const { expect } = require('chai')
const User = require('../src/models/User')

describe('Deleting a user...', () => {
	let joe
	beforeEach(async () => {
		joe = new User({ name: 'Joe' })
		return joe.save().then()
	})

	it('document remove', async () => {
		return joe
			.remove()
			.then(() => {
				return User.findOne({ name: 'Joe' })
			})
			.then((user) => {
				expect(user).to.be.null
			})
	})

	it('model remove', async () => {
		return User.deleteMany({ name: 'Joe' })
			.then(() => {
				return User.findOne({ name: 'Joe' })
			})
			.then((user) => {
				expect(user).to.be.null
			})
	})

	it('model findAndRemove', async () => {
		return User.findOneAndDelete({ name: 'Joe' })
			.then(() => {
				return User.findOne({ name: 'toe' })
			})
			.then((user) => {
				expect(user).to.be.null
			})
	})

	it('model findByIdAndRemove', async () => {
		return User.findByIdAndDelete(joe._id)
			.then(() => {
				return User.findOne({ name: 'Joe' })
			})
			.then((user) => {
				expect(user).to.be.null
			})
	})
})
