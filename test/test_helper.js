const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/users_test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
mongoose.connection
	.once('open', () => {
		console.log('Good to go!')
	})
	.on('error', (error) => {
		console.log('Error', error)
	})
