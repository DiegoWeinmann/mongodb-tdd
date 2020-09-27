const { expect } = require('chai')
const User = require('../src/models/User')

describe('Validation records...', () => {
	it('requires a user name', async () => {
		const user = new User({ name: undefined })
		expect(user.validateSync().errors.name.message).to.equal(
			'Name is required.'
		)
	})

	it('requires that the name is at least 3 characters long', () => {
		const user = new User({ name: 'al' })
		expect(user.validateSync().errors.name.message).to.equal(
			'The name must be at least 3 characters long.'
		)
	})

	it('disallows invalid records from being saved', async () => {
		const user = new User({ name: 'Al' })
		return user.save().catch((err) => {
			expect(err.errors.name.message).to.equal(
				'The name must be at least 3 characters long.'
			)
		})
  })


})
