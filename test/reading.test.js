const { expect } = require('chai')
const User = require('../src/models/User')

describe.only('Reading users...', () => {
	let joe

	beforeEach(async () => {
		joe = new User({ name: 'Joe' })
		const users = [
			new User({ name: 'user1' }),
			new User({ name: 'user2' }),
			new User({ name: 'user3' }),
		]
		return Promise.all([joe, ...users].map((user) => user.save()))
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

	it('can skip and limit the result set', async () => {
		return User.find({})
			.sort({
				name: 1,
			})
			.skip(1)
			.limit(3)
			.then((users) => {
				console.log(users.map((user) => user.name))
				expect(users.length).to.equal(3)
				expect(users[0].name).to.equal('user1')
				expect(users[1].name).to.equal('user2')
				expect(users[2].name).to.equal('user3')
			})
	})
})
