const { expect } = require('chai')
const User = require('../src/models/User')

describe('Reading users...', () => {
	let joe

	beforeEach(async () => {
		joe = new User({ name: 'Joe' })
		return joe.save().then()
	})

	it('finds all the users with the name of Joe', async () => {
		return User.find({ name: 'Joe' }).then((users) => {
			expect(users[0]._id.toString() === joe._id.toString()).to.be.true
		})
	})

	it('finds a user with a particular id', async () => {
		return User.findOne({ _id: joe._id }).then((user) => {
			expect(user._id.toString() === joe._id.toString()).to.be.true
		})
	})
})
