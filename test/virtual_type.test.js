const { expect } = require('chai')
const User = require('../src/models/User')

describe.only('Virtual Types...', () => {
	it('postCount returns number of posts', async () => {
		const joe = new User({ name: 'Joe', posts: [{ title: 'PostTitle' }] })
		return joe
			.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				expect(user.postCount).to.equal(1)
			})
	})
})
