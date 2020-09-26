const { expect } = require('chai')
const User = require('../src/models/User')

describe('Creating records...', () => {
	it('saves a user', (done) => {
		const joe = new User({
			name: 'joe',
		})

		joe.save().then(() => {
			expect(joe.isNew).to.be.false
			done()
		})
	})
})
