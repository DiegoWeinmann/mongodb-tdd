const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before((done) => {
  console.clear()
	mongoose.connect('mongodb://localhost:27017/users_test', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	mongoose.connection
		.once('open', () => {
			console.log(
				`Connected to ${mongoose.connection.db.databaseName} database...`
			)
			done()
		})
		.on('error', (error) => {
			console.log('Error', error)
		})
})

beforeEach((done) => {
	if (mongoose.connection.collections.users) {
		mongoose.connection.collections.users.drop((err, result) => {
			done()
		})
	} else {
		done()
	}
})
